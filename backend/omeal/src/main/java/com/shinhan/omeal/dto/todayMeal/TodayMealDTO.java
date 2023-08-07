package com.shinhan.omeal.dto.todayMeal;

import com.shinhan.omeal.dto.delivery.DeliveryStatus;
import com.shinhan.omeal.entity.DeliveryHistory;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class TodayMealDTO {
    private String menu; // 배송 메뉴
    private DeliveryStatus status; // 배송 현황
    private String deliveryAddr; // 배송지
    
    // 나중에 피드백 관련 DTO 추가할 예정

    // toDTO
    public static TodayMealDTO toTodayMealDTO(DeliveryHistory deliveryHistory){
        return TodayMealDTO.builder()
                .menu(deliveryHistory.getMenu())
                .status(deliveryHistory.getStatus())
                .deliveryAddr(deliveryHistory.getDeliveryAddr())
                .build();
    }
}
