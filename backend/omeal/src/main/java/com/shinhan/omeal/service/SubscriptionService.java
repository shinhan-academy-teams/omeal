package com.shinhan.omeal.service;

import com.shinhan.omeal.dto.members.MemberGrade;
import com.shinhan.omeal.dto.subscription.SubscriptionDTO;
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
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    final SubscriptionRepository subRepo;
    final MembersRepository memRepo;
    final AllergyRepository allergyRepo;
    final SubscriptionHistoryRepository historyRepo;
    
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
                .startDate(LocalDate.now())
                .endDate(calEndDate(subscriptionInfo.getSubType()))
                .build();
        subRepo.save(newSubscription);
        // 히스토리 저장
        History newHistory = History.builder()
                .member(member)
                .subType(newSubscription.getSubType())
                .category(newSubscription.getCategory())
                .status(SubscriptionStatus.START)
                .payDate(newSubscription.getPayDate())
                .startDate(newSubscription.getStartDate())
                .endDate(newSubscription.getEndDate())
                .build();
        historyRepo.save(newHistory);
        return "OK";
    }

    // 구독정보 갱신
    public void updateSubscriptionInfo() {
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
                historyRepo.save(history);
                LocalDate newEndDate = calEndDate(subscription.getSubType());
                subscription.updateSubscription(newEndDate);
                subRepo.save(subscription);
            }
        });
    }

    // 첫 배송 예정일 안내
    public LocalDate calFirstDeliveryDate() {
        LocalDate today = LocalDate.now();
        LocalDate firstDeliveryDate = today.plusDays(2);
        DayOfWeek week = firstDeliveryDate.getDayOfWeek();
        if(week.equals(DayOfWeek.SATURDAY)) {
            firstDeliveryDate = firstDeliveryDate.plusDays(2);
        } else if(week.equals(DayOfWeek.SUNDAY)) {
            firstDeliveryDate = firstDeliveryDate.plusDays(1);
        }
        return firstDeliveryDate;
    }

    // 구독 종료일 계산
    private LocalDate calEndDate(SubscriptionType type) {
        LocalDate endDate = LocalDate.now();
        if(type.equals(SubscriptionType.MONTHLY)) {
            endDate = endDate.plusDays(30);
        } else {
            endDate = endDate.plusDays(6);
        }
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

    // 회원의 연속 기간 가져오기
    public int getContinuousDays(String memberId) {
        int days = 0;
        Members member = memRepo.findById(memberId).orElse(null);
        Subscription sub = subRepo.findByMember(member);
        if (sub == null) {
            days = -1;
        } else {
            days = subRepo.findContinuousDaysByMemberId(memberId);
        }
        return days;
    }

    // 로그인 시 => 회원등급 업데이트 & Front에 전송까지
    public Members updateMemberGrade(Members member){
        String memberId = member.getMemberId();

        // 1. 회원 ID를 이용해서 => 구독 기간 가져오고 (by경윤)
        int days = getContinuousDays(memberId);

        // 2. 구독 기간을 이용해서 (1)등급 계산 & (2)업데이트 (by용희)
        MemberGrade memberGrade = calMemberGrade(days);
        member.updateMemberGrade(memberGrade);
        memRepo.save(member);

        // 3. 마지막으로 등급을 리턴 => 로그인 시 전송되게끔
        return member;
    }

    // 2-1. 구독 기간을 이용해서 등급 계산
    public MemberGrade calMemberGrade(int days){
        MemberGrade memberGrade = MemberGrade.날계란;

        // 3, 6, 12개월 별로 분류
        if(days >= 365){
            memberGrade = MemberGrade.훈제란;
        }else if(days < 365 && days >= 180){
            memberGrade = MemberGrade.완숙란;
        }else if(days < 180 && days >= 90){
            memberGrade = MemberGrade.반숙란;
        }

        return memberGrade;
    }

    // 2-2. 계산한 등급을 DB에 업데이트
//    public Members updateById(Members member, MemberGrade memberGrade){
//        // 회원 ID로부터 회원등급 & 구독기간 가져오기
//        //Members member = memRepo.findById(memberId).orElseThrow(()->new NoSuchElementException());
//
//        // 회원등급 update
//        member.updateMemberGrade(memberGrade);
//
//        // 그 member 객체를 return
//        return member;
//    }

}
