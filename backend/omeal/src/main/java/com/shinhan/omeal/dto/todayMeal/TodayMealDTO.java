package com.shinhan.omeal.dto.todayMeal;

import com.shinhan.omeal.dto.delivery.DeliveryStatus;
import com.shinhan.omeal.dto.subscription.SubscriptionCategory;
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
    private SubscriptionCategory category; // 무슨 음식을 구독 중인지 알아야 Front에서 그에 맞는 이미지 제공해주기 편하므로
  
    // toDTO
    public static TodayMealDTO toTodayMealDTO(DeliveryHistory deliveryHistory, SubscriptionCategory category){
        return TodayMealDTO.builder()
                .menu(deliveryHistory.getMenu())
                .status(deliveryHistory.getStatus())
                .deliveryAddr(deliveryHistory.getDeliveryAddr())
                .category(category)
                .build();
    }
}
