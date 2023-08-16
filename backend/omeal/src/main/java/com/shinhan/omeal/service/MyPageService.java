package com.shinhan.omeal.service;

import com.shinhan.omeal.dto.delivery.DeliveryHistoryDTO;
import com.shinhan.omeal.dto.members.MyPageUserInfoDTO;
import com.shinhan.omeal.dto.members.ResultUserInfoDTO;
import com.shinhan.omeal.dto.subscription.PaymentDTO;
import com.shinhan.omeal.dto.subscription.UserSubInfoDTO;
import com.shinhan.omeal.entity.Allergy;
import com.shinhan.omeal.entity.Members;
import com.shinhan.omeal.entity.Subscription;
import com.shinhan.omeal.repository.MembersRepository;
import com.shinhan.omeal.repository.SubscriptionHistoryRepository;
import com.shinhan.omeal.repository.SubscriptionRepository;
import com.shinhan.omeal.repository.TodayMealRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MyPageService {
    final MembersRepository memRepo;
    final SubscriptionRepository subRepo;
    final TodayMealRepository tmRepo;
    final SubscriptionHistoryRepository pmHistoryRepo;

    @Transactional
    public String update(MyPageUserInfoDTO userInfo) {
        try {
            Members mem = memRepo.findById(userInfo.getMemberId()).orElse(null);
            assert mem != null;
            mem.updateUserInfo(userInfo);
            return "update Success";
        } catch (Exception e) {
            return "update Fail";
        }
    }

    public ResultUserInfoDTO getUserInfo(String memId) {
        Members mem = memRepo.findById(memId).orElse(null);
        assert mem != null;
        ResultUserInfoDTO remem = new ResultUserInfoDTO(mem);

        return remem;
    }

    @Transactional
    public UserSubInfoDTO getSubInfo(String memId) {  // 마이페이지 - 구독과 알러지 정보 응답
        Members mem = memRepo.findById(memId).orElse(null);
        try {
            assert mem != null;
            List<Allergy> allergyList = mem.getMemberAllergy();
            List<String> allergy = allergyList.stream().map(Allergy::getAllergyFood).collect(Collectors.toList());
            Subscription sub = subRepo.findByMember(mem);

            UserSubInfoDTO dto = new UserSubInfoDTO(sub.getSubDTO(), allergy);

            return dto;
        } catch (NullPointerException e) {
            return null;
        }

    }

    // 마이페이지 - 배송내역
    public List<DeliveryHistoryDTO> getDeliveryHistory(String memId) {
        Members member = memRepo.findById(memId).orElse(null);
        List<DeliveryHistoryDTO> history = new ArrayList<>();
        tmRepo.findAllByMemberOrderByDeliveryDateDesc(member).forEach(deliveryHistory -> {
            history.add(deliveryHistory.getDeliveryHistoryDTO());
        });

        return history;
    }

    // 마이페이지 - 결제내역
    public List<PaymentDTO> getPaymentHistory(String memId) {
        Members member = memRepo.findById(memId).orElse(null);
        List<PaymentDTO> history = new ArrayList<>();
        pmHistoryRepo.findAllByMemberOrderByPayDateDesc(member).forEach(paymentHistory -> {
            history.add(paymentHistory.getPaymentDTO());
        });

        return history;
    }

}
