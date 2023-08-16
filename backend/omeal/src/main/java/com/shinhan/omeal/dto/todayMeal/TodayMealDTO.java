package com.shinhan.omeal.dto.todayMeal;

import com.shinhan.omeal.dto.delivery.DeliveryStatus;
import com.shinhan.omeal.dto.subscription.SubscriptionCategory;
import com.shinhan.omeal.entity.DeliveryHistory;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class TodayMealDTO {
    private Long deliveryNo;
    private String menu; // 배송 메뉴
    private DeliveryStatus status; // 배송 현황
    private String deliveryAddr; // 배송지
    private SubscriptionCategory category; // 카테고리

    // toDTO
    public static TodayMealDTO toTodayMealDTO(DeliveryHistory deliveryHistory, SubscriptionCategory category) {
        return TodayMealDTO.builder()
                .deliveryNo(deliveryHistory.getDeliveryNo())
                .menu(deliveryHistory.getMenu())
                .status(deliveryHistory.getStatus())
                .deliveryAddr(deliveryHistory.getDeliveryAddr())
                .category(category)
                .build();
    }
}
