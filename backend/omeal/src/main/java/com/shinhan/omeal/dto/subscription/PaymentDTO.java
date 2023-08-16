package com.shinhan.omeal.dto.subscription;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class PaymentDTO {
    private LocalDateTime date;
    private LocalDate startDate;
    private LocalDate endDate;
    private SubscriptionCategory category;
    private String status;
    private int amount;
}
