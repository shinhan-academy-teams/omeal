package com.shinhan.omeal.service;

import com.shinhan.omeal.dto.delivery.DeliveryStatus;
import com.shinhan.omeal.dto.delivery.DeliveryTime;
import com.shinhan.omeal.dto.subscription.SubscriptionCategory;
import com.shinhan.omeal.dto.todayMeal.TodayMealDTO;
import com.shinhan.omeal.entity.*;
import com.shinhan.omeal.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class TodayMealService {

    final TodayMealRepository tmRepo;
    final MembersRepository memRepo;
    final AllergyRepository allergyRepo;
    final MenuRepository menuRepo;
    final SubscriptionRepository subRepo;

    // 하단의 '오늘의 밀' 아이콘 눌렀을 때 뜨는 첫 페이지
    public TodayMealDTO getDeliveryInfo(String memberId){
        // 그럴리 없겠지만 혹시나 memberId에 해당하는 Members 엔티티가 없다면 RuntimeException 으로 예외처리하게끔 설정 (체크 예외 말고)
        Members member = memRepo.findById(memberId).orElseThrow(()->new NoSuchElementException());

        // 배송내역 1건만 보여줘야 하므로
        List<DeliveryHistory> deliveryHistoryList = tmRepo.findByMemberOrderByDeliveryNoDesc(member);
        DeliveryHistory deliveryHistory = deliveryHistoryList.get(0);
        
        return TodayMealDTO.toTodayMealDTO(deliveryHistory);
    }

    /*
    오늘의 메뉴 준비 스케줄러
    오전6시에 일괄적으로 배송준비
    아침구독 배송시작
     */
    @Scheduled(cron = "0 0 6 * * *")
    @Transactional
    public void prepareTodayMeal() {
        // 서비스 구독중인 회원 목록
        subRepo.findAll().forEach(subscription -> {
            // 구독 중인 음식 타입 메뉴 뽑기
            Set<Menu> allMenu = menuRepo.findByCategory(SubscriptionCategory.샌드위치백작); //subscription.getCategory()
            // 알레르기 유무 확인
            if(subscription.getMember().getMemberAllergy().size()!=0) {
                allMenu = menuRepo.findByAllergyNotIn(subscription.getMember().getMemberAllergy());
            }
            // 메뉴선정
            String todayMeal = getRandomMenu(allMenu);
            // 배송준비
            prepareDelivery(subscription, todayMeal);
        });

    }

    /*
    오전8시 1차 배송 확인 스케줄러
    아침구독 배송완료
    점심구독 배송시작
     */
    @Scheduled(cron = "0 0 8 * * *")
    public void morningDelivery() {
        // 아침구독 배송완료
        completeDelivery(checkMealTime(DeliveryTime.아침));
        // 점심구독 배송시작
        inProgressDelivery(checkMealTime(DeliveryTime.점심));
    }

    /*
    오후12시 2차 배송 확인 스케줄러
    점심구독 배송완료
    저녁구독 배송시작
    */
    @Scheduled(cron = "0 0 12 * * *")
    public void lunchDelivery() {
        // 점심구독 배송완료
        completeDelivery(checkMealTime(DeliveryTime.점심));
        // 저녁구독 배송시작
        inProgressDelivery(checkMealTime(DeliveryTime.저녁));
    }

    /*
    오후19시 3차 배송 확인 스케줄러
    저녁구독 배송완료
    */
    @Scheduled(cron = "0 0 19 * * *")
    public void dinnerDelivery() {
        // 저녁구독 배송완료
        completeDelivery(checkMealTime(DeliveryTime.저녁));
    }


    // 랜덤으로 오늘의 메뉴 선정
    private String getRandomMenu(Set<Menu> allMenu){
        long size = allMenu.size();
        int randomNumber = (int)(Math.random()*size);
        List<Menu> menuList = new ArrayList<>(allMenu);
        String todayMeal = menuList.get(randomNumber).getMenuName();
        return todayMeal;
    }

    // 구독한 회원들의 메뉴 배송 준비
    private void prepareDelivery(Subscription subscription, String todayMeal) {
        DeliveryHistory todayDelivery = DeliveryHistory.builder()
                .member(subscription.getMember())
                .menu(todayMeal)
                .status(subscription.getMealTime().equals(DeliveryTime.아침)?DeliveryStatus.배송중:DeliveryStatus.배송준비중)
                .deliveryAddr(subscription.getDeliveryAddr())
                .build();
        tmRepo.save(todayDelivery);
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
        tmRepo.findAllByMemberIn(membersByTime).forEach(history->{
            history.updateDeliveryStatus(DeliveryStatus.배송중);
            tmRepo.save(history);
        });
    }

    // 배송 현황을 배송완료로 업데이트
    private void completeDelivery(List<Members> membersByTime) {
        tmRepo.findAllByMemberIn(membersByTime).forEach(history->{
            history.updateDeliveryStatus(DeliveryStatus.배송완료);
            tmRepo.save(history);
        });
    }

}
