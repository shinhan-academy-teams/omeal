package com.shinhan.omeal.dto.todayMeal;

import com.shinhan.omeal.dto.delivery.DeliveryStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TodayMealDTO {
    private String menu; // 배송 메뉴
    private DeliveryStatus status; // 배송 현황
    private String deliveryAddr; // 배송지
    
    // 나중에 피드백 관련 DTO 추가할 예정
}
