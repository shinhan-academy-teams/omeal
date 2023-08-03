package com.shinhan.omeal.service;

import com.shinhan.omeal.dto.subscription.SubscriptionDTO;
import com.shinhan.omeal.dto.subscription.SubscriptionType;
import com.shinhan.omeal.entity.Allergy;
import com.shinhan.omeal.entity.Members;
import com.shinhan.omeal.entity.Subscription;
import com.shinhan.omeal.repository.AllergyRepository;
import com.shinhan.omeal.repository.MembersRepository;
import com.shinhan.omeal.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    final SubscriptionRepository subRepo;
    final MembersRepository memRepo;
    final AllergyRepository allergyRepo;
    
    public String subscribe(SubscriptionDTO subscriptionInfo) {
        Members member = memRepo.findById(subscriptionInfo.getMemberId()).orElse(null);
        // 멤버 알레르기 정보 입력
        if(subscriptionInfo.getMemberAllergy().size()!=0){
            List<Allergy> allergyData = mappingAllergyData(subscriptionInfo.getMemberAllergy());
            member.updateAllergy(allergyData);
            memRepo.save(member);
        }
        // 구독 정보 저장
        Subscription newSubscription = Subscription.builder()
                .member(member)
                .subType(subscriptionInfo.getSubType())
                .category(subscriptionInfo.getCategory())
                .deliveryAddr(subscriptionInfo.getDeliveryAddr())
                .container(subscriptionInfo.getContainer())
                .mealTime(subscriptionInfo.getMealTime())
                .startDate(new Date())
                .endDate(calEndDate(subscriptionInfo.getSubType()))
                .build();
        subRepo.save(newSubscription);
        return "OK";
    }

    // 구독 종료일 계산
    private Date calEndDate(SubscriptionType type) {
        Calendar calendar = Calendar.getInstance();
        if(type.equals(SubscriptionType.MONTHLY)) {
            calendar.add(Calendar.DATE,30);
        } else {
            calendar.add(Calendar.DATE,6);
        }
        Date endDate = new Date(calendar.getTimeInMillis());
        return endDate;
    }

    // 입력 받은 알레르기 정보를 DB에 있는 데이터와 매핑
    private List<Allergy> mappingAllergyData(List<String> selectedAllergy) {
        List<Allergy> allergyData = new ArrayList<>();
        selectedAllergy.stream().forEach(foodName -> {
            Allergy allergy = allergyRepo.findByAllergyFood(foodName);
            allergyData.add(allergy);
        });
        return allergyData;
    }

}
