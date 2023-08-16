package com.shinhan.omeal.dto.admin;

import com.shinhan.omeal.dto.subscription.SubscriptionType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class PaymentResultDTO {
    private String dateInfo;               //날짜 정보
    private SubscriptionType subType;   // 구독 정복
    private long totalSales;            // 금액
}
