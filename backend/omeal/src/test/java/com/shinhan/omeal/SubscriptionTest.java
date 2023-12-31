package com.shinhan.omeal;

import com.shinhan.omeal.dto.delivery.DeliveryContainer;
import com.shinhan.omeal.dto.delivery.DeliveryTime;
import com.shinhan.omeal.dto.subscription.SubscriptionCategory;
import com.shinhan.omeal.dto.subscription.SubscriptionStatus;
import com.shinhan.omeal.dto.subscription.SubscriptionType;
import com.shinhan.omeal.entity.Allergy;
import com.shinhan.omeal.entity.History;
import com.shinhan.omeal.entity.Members;
import com.shinhan.omeal.entity.Subscription;
import com.shinhan.omeal.repository.AllergyRepository;
import com.shinhan.omeal.repository.MembersRepository;
import com.shinhan.omeal.repository.SubscriptionHistoryRepository;
import com.shinhan.omeal.repository.SubscriptionRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

@SpringBootTest
public class SubscriptionTest {
    @Autowired
    SubscriptionRepository subRepo;
    @Autowired
    MembersRepository memRepo;
    @Autowired
    AllergyRepository allergyRepo;
    @Autowired
    SubscriptionHistoryRepository subHistoryRepo;

    @Test
    void subscriptTest() { // 데이터 저장
            Members member = memRepo.findById("test1@mail.com").orElse(null);
            Subscription newSubscription = Subscription.builder()
                    .member(member)
                    .subType(SubscriptionType.MONTHLY)
                    .category(SubscriptionCategory.비빔대감)
                    .deliveryAddr("마이 스윗홈")
                    .container(DeliveryContainer.다회용기)
                    .mealTime(DeliveryTime.점심)
                    .startDate(LocalDate.now()) // 구독 시작일 : 오늘
                    .endDate(calEndDate(SubscriptionType.MONTHLY)).build(); //
            subRepo.save(newSubscription);
        }

    @Test
    Date calFirstDeliveryDate() { // 첫 배송일 계산
       LocalDate today = LocalDate.now();
//        LocalDate sat = LocalDate.of(2023,8,3);
//        LocalDate sun = LocalDate.of(2023,8,4);
        LocalDate firstDeliveryDate = today.plusDays(2);
        DayOfWeek week = firstDeliveryDate.getDayOfWeek();
        if(week.equals(DayOfWeek.SATURDAY)) {
            firstDeliveryDate = firstDeliveryDate.plusDays(2);
        } else if(week.equals(DayOfWeek.SUNDAY)) {
            firstDeliveryDate = firstDeliveryDate.plusDays(1);
        }
        Instant instant = firstDeliveryDate.atStartOfDay(ZoneId.systemDefault()).toInstant();
        return Date.from(instant);
    }

    LocalDate calEndDate(SubscriptionType type) { // 구독 종료일 계산
        LocalDate endDate = LocalDate.now();
        if(type.equals(SubscriptionType.MONTHLY)) {
            endDate = endDate.plusDays(30);
        } else {
            endDate = endDate.plusDays(6);
        }
        return endDate;
    }

    @Test
    void insertAllergyTest() {
        // test data : 돼지고기, 유제품
        List<String> testData = new ArrayList<>();
        testData.add("돼지고기");
        testData.add("유제품");
        List<Allergy> memberAllergy = new ArrayList<>();
        testData.stream().forEach(foodName -> {
            Allergy allergy = allergyRepo.findByAllergyFood(foodName);
            memberAllergy.add(allergy);
        });
        Members member = memRepo.findById("kky417@kakao.com").orElse(null);
        member.updateAllergy(memberAllergy);
        memRepo.save(member);
    }

    @Test
    void enumTest() {
        System.out.println(Arrays.toString(SubscriptionType.values()));
    }

    @Test
    @Transactional
    void updateSubscriptionTest() {
        LocalDate today = LocalDate.now();
        subRepo.findAll().forEach(subscription -> {
            if(subscription.getEndDate().isBefore(today)){
                History history = History.builder()
                        .member(subscription.getMember())
                        .subType(subscription.getSubType())
                        .category(subscription.getCategory())
                        .status(SubscriptionStatus.END)
                        .payDate(subscription.getPayDate())
                        .startDate(subscription.getStartDate())
                        .endDate(subscription.getEndDate())
                        .build();
                subHistoryRepo.save(history);
                LocalDate newEndDate = calEndDate(subscription.getSubType());
                System.out.println(newEndDate);
                subscription.updateSubscription(newEndDate);
                subRepo.save(subscription);
            }
        });
    }
}
