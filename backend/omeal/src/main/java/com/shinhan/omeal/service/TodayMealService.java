package com.shinhan.omeal.service;

import com.shinhan.omeal.dto.delivery.DeliveryStatus;
import com.shinhan.omeal.dto.delivery.DeliveryTime;
import com.shinhan.omeal.dto.subscription.SubscriptionCategory;
import com.shinhan.omeal.dto.todayMeal.FeedbackDTO;
import com.shinhan.omeal.dto.todayMeal.TodayMealDTO;
import com.shinhan.omeal.entity.*;
import com.shinhan.omeal.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TodayMealService {

    final TodayMealRepository tmRepo;
    final MembersRepository memRepo;
    final AllergyRepository allergyRepo;
    final MenuRepository menuRepo;
    final SubscriptionRepository subRepo;
    final FeedbackRepository feedbackRepo;

    // 피드백 남기기
    public DeliveryHistory submitFeedback(@RequestBody FeedbackDTO dto) {
        // 피드백 남겼을 시 Delivery_history 테이블의 feedbackStatus를 0 => 1
        DeliveryHistory deliveryHistory = tmRepo.findById(dto.getDeliveryNo()).get();
        deliveryHistory = DeliveryHistory.updateFeedbackStatus(deliveryHistory);
        tmRepo.save(deliveryHistory);

        Members member = memRepo.findById(dto.getMemberId()).orElse(null);
        List<Menu> menuIdList = menuRepo.findByMenuName(dto.getMenuName());
        String feedbackStr = dto.getFeedback();

        // 피드백 테이블에서 회원 정보와 메뉴 이름으로 조회
        if (feedbackRepo.findByMemberAndMenu(member, menuIdList.get(0)) == null) { // 없으면
            if (feedbackStr.equals("dislike")) { // 클라이언트가 싫어요를 눌렀으면
                for (Menu menu : menuIdList) {
                    Feedback feedback = Feedback.builder()
                            .member(member)
                            .menu(menu)
                            .build();

                    feedbackRepo.save(feedback);
                }
            } else { // 클라이언트가 좋아요를 눌렀으면
                //return "do NOTHING";
            }
        } else {
            if (feedbackStr.equals("dislike")) { // 클라이언트가 싫어요를 눌렀으면
                //return "already DISLIKED";
            } else { // 클라이언트가 좋아요를 눌렀으면
                for (Menu menu : menuIdList) {
                    feedbackRepo.deleteByMemberAndMenu(member, menu);
                }
            }
        }

        //return "success";
        return deliveryHistory;
    }

    // 하단의 '오늘의 밀' 아이콘 눌렀을 때 뜨는 첫 페이지
    public TodayMealDTO getDeliveryInfo(String memberId) {
        // 그럴리 없겠지만 혹시나 memberId에 해당하는 Members 엔티티가 없다면 RuntimeException 으로 예외처리하게끔 설정 (체크 예외 말고)
        Members member = memRepo.findById(memberId).orElseThrow(() -> new NoSuchElementException());

        // 배송내역 1건만 보여줘야 하므로
        List<DeliveryHistory> deliveryHistoryList = tmRepo.findByMemberOrderByDeliveryNoDesc(member);
        if(!deliveryHistoryList.isEmpty()){ // 아직 배송될 메뉴가 없을 때를 대비해서
            DeliveryHistory deliveryHistory = deliveryHistoryList.get(0);

            // TodayMealDTO에 category도 같이 넘겨주기 위해
            SubscriptionCategory category = subRepo.findByMember(member).getCategory();

            return TodayMealDTO.toTodayMealDTO(deliveryHistory, category);
        }

        return null;
    }

    @Transactional
    public void prepareTodayMeal() {
        // 서비스 구독중인 회원 목록
        subRepo.findAll().forEach(subscription -> {
            // 구독 멤버 알레르기 정보 확인
            Set<Menu> allergyMenu = null;
            if(!subscription.hasNotAllergy()) {
                allergyMenu = menuRepo.findByAllergyIn(subscription.getMemberAllergyInfo());
            }
            // 메뉴 선정
            String todayMeal = "";
            if(subscription.getCategory().equals(SubscriptionCategory.애국자)){
                todayMeal = getHomeMeal(allergyMenu);
            } else {
                todayMeal = getCommonMeal(allergyMenu, subscription.getCategory());
            }
            // 배송준비
            prepareDelivery(subscription, todayMeal);
        });
    }

    // 가정식 제외 메뉴 선정
    private String getCommonMeal(Set<Menu> allergyMenu, SubscriptionCategory category) {
        Set<Menu> allMenu = menuRepo.findByCategory(category);
        if(allergyMenu!=null) {
            allMenu.removeAll(allergyMenu);
        }
        return getRandomMenu(allMenu);
    }

    // 가정식 메뉴 선정
    private String getHomeMeal(Set<Menu> allergyMenu) {
        Set<Menu> mainDishList = menuRepo.findBySubcategory("메인반찬");
        Set<Menu> sideDishList = menuRepo.findBySubcategory("밑반찬");
        if(allergyMenu!=null) {
            mainDishList.removeAll(allergyMenu);
            sideDishList.removeAll(allergyMenu);
        }
        String mainDish = getRandomMenu(mainDishList);
        String sideDish = getRandomMenu(sideDishList);
        return mainDish + "|" + sideDish;
    }

    // 가정식 제외 랜덤으로 오늘의 메뉴 선정
    private String getRandomMenu(Set<Menu> menu){
        long size = menu.size();
        int randomNumber = (int)(Math.random()*size);
        List<Menu> menuList = new ArrayList<>(menu);
        String todayMeal = menuList.get(randomNumber).getMenuName();
        return todayMeal;
    }

    // 메뉴 배송 준비
    private void prepareDelivery(Subscription subscription, String todayMeal) {
        DeliveryHistory todayDelivery = DeliveryHistory.builder()
                .member(subscription.getMember())
                .menu(todayMeal)
                .status(subscription.getMealTime().equals(DeliveryTime.아침) ? DeliveryStatus.배송중 : DeliveryStatus.배송준비중)
                .deliveryAddr(subscription.getDeliveryAddr())
                .build();
        tmRepo.save(todayDelivery);
    }

    // 배송상태 변경
    public void changeDeliveryStatus(String start, String complete) {
        // 배송시작
        if(start!=null) {
            inProgressDelivery(checkMealTime(DeliveryTime.valueOf(start)));
        }
        // 배송완료
        if(complete!=null) {
            completeDelivery(checkMealTime(DeliveryTime.valueOf(complete)));
        }

    }

    // 멤버별 구독 시간 확인
    private List<Members> checkMealTime(DeliveryTime time) {
        List<Members> membersByTime = new ArrayList<>();
        subRepo.findAllByMealTime(time).forEach(subscription -> {
            membersByTime.add(subscription.getMember());
        });
        return membersByTime;
    }

    // 배송 현황을 배송중으로 업데이트
    private void inProgressDelivery(List<Members> membersByTime) {
        tmRepo.findAllByMemberIn(membersByTime).forEach(history -> {
            history.updateDeliveryStatus(DeliveryStatus.배송중);
            tmRepo.save(history);
        });
    }

    // 배송 현황을 배송완료로 업데이트
    private void completeDelivery(List<Members> membersByTime) {
        tmRepo.findAllByMemberIn(membersByTime).forEach(history -> {
            history.updateDeliveryStatus(DeliveryStatus.배송완료);
            tmRepo.save(history);
        });
    }

}
