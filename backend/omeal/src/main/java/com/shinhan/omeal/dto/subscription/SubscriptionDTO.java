package com.shinhan.omeal.dto.subscription;

import com.shinhan.omeal.dto.delivery.DeliveryContainer;
import com.shinhan.omeal.dto.delivery.DeliveryTime;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SubscriptionDTO {
    private String memberId;
    private SubscriptionType subType;
    private SubscriptionCategory category;
    private String deliveryAddr;
    private DeliveryContainer container;
    private DeliveryTime mealTime;
    private List<String> memberAllergy;
}
