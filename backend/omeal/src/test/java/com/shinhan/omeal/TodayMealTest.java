package com.shinhan.omeal;

import com.shinhan.omeal.dto.delivery.DeliveryStatus;
import com.shinhan.omeal.dto.delivery.DeliveryTime;
import com.shinhan.omeal.entity.*;
import com.shinhan.omeal.repository.MembersRepository;
import com.shinhan.omeal.repository.MenuRepository;
import com.shinhan.omeal.repository.SubscriptionRepository;
import com.shinhan.omeal.repository.TodayMealRepository;
import com.shinhan.omeal.service.TodayMealService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@SpringBootTest
public class TodayMealTest {
    @Autowired
    MembersRepository memRepo;
    @Autowired
    SubscriptionRepository subRepo;
    @Autowired
    TodayMealService tmService;
    @Autowired
    MenuRepository menuRepo;
    @Autowired
    TodayMealRepository tmRepo;

    @Test
    @Transactional
    void getMemberAllergyTest() {
        Members member = memRepo.findById("test2@mail.com").orElse(null);
        List<Allergy> memberAllergyList = member.getMemberAllergy();
        Set<Menu> menuSet = menuRepo.findByAllergyIn(memberAllergyList);
        System.out.println(menuSet.size());
    }

    @Test
    @Transactional
    void findAllSubscription() {
        List<Subscription> subscriptionList = new ArrayList<>();
        subRepo.findAll().forEach(subscription -> {
            List<Allergy> memberAllergyList = subscription.getMember().getMemberAllergy();
            Set<Menu> menuSet = menuRepo.findByAllergyIn(memberAllergyList);
            System.out.println(menuSet.size());

        });
    }

    @Test
    @Transactional
    void getMenuTest() {
        // 서비스 구독중인 회원 목록
        subRepo.findAll().forEach(subscription -> {
            // 구독 중인 음식 타입 메뉴 뽑기
            Set<Menu> allMenu = menuRepo.findByCategory(subscription.getCategory());
            System.out.println(subscription.getCategory());
            // 알레르기 유무 확인
            if(subscription.getMember().getMemberAllergy().size()!=0) {
                Set<Menu> allergyMenu = menuRepo.findByAllergyIn(subscription.getMember().getMemberAllergy());
                allMenu.removeAll(allergyMenu);
            }
            // 랜덤으로 오늘의 메뉴 선정
            long size = allMenu.size();
            int randomNumber = (int)(Math.random()*size);
            List<Menu> menuList = new ArrayList<>(allMenu);
            String todayMeal = menuList.get(randomNumber).getMenuName();
            System.out.println(todayMeal);
            // 배송 준비
            DeliveryHistory todayDelivery = DeliveryHistory.builder()
                    .member(subscription.getMember())
                    .menu(todayMeal)
                    .status(DeliveryStatus.배송준비중)
                    .deliveryAddr(subscription.getDeliveryAddr())
                    .build();
            tmRepo.save(todayDelivery);


        });
    }

    @Test
    void updateDelivery() {
        // 구독 시간 확인
        List<Members> membersByTime = new ArrayList<>();
        subRepo.findAllByMealTime(DeliveryTime.아침).forEach(subscription -> {
            membersByTime.add(subscription.getMember());
        });
        tmRepo.findAllByMemberIn(membersByTime).forEach(history->{
            LocalDate todayDelivery = history.getDeliveryDate().toLocalDate();
            System.out.println(todayDelivery.equals(LocalDate.now()));
            history.updateDeliveryStatus(DeliveryStatus.배송완료);
            tmRepo.save(history);
        });

    }

    @Test
    void findByCategoryTest(){
        Members member = memRepo.findById("asdf@naver.com").orElse(null);
        subRepo.findByMember(member).getCategory();
        Set<Menu> allmenu = menuRepo.findByCategory(subRepo.findByMember(member).getCategory());
        allmenu.forEach(menu->{
            System.out.println(menu.getMenuName());
        });
    }
}
