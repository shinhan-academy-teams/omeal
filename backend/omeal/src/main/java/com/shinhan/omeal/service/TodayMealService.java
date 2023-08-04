package com.shinhan.omeal.service;

import com.shinhan.omeal.dto.todayMeal.TodayMealDTO;
import com.shinhan.omeal.entity.DeliveryHistory;
import com.shinhan.omeal.entity.Members;
import com.shinhan.omeal.repository.MembersRepository;
import com.shinhan.omeal.repository.TodayMealRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class TodayMealService {

    final TodayMealRepository tmRepo;
    final MembersRepository memRepo;

    // 하단의 '오늘의 밀' 아이콘 눌렀을 때 뜨는 첫 페이지
    public TodayMealDTO getDeliveryInfo(String memberId){
        // 그럴리 없겠지만 혹시나 memberId에 해당하는 Members 엔티티가 없다면 RuntimeException 으로 예외처리하게끔 설정 (체크 예외 말고)
        Members member = memRepo.findById(memberId).orElseThrow(()->new NoSuchElementException());

        // 배송내역 1건만 보여줘야 하므로
        List<DeliveryHistory> deliveryHistoryList = tmRepo.findByMemberOrderByDeliveryNoDesc(member);
        DeliveryHistory deliveryHistory = deliveryHistoryList.get(0);
        
        return TodayMealDTO.toTodayMealDTO(deliveryHistory);
    }
}
