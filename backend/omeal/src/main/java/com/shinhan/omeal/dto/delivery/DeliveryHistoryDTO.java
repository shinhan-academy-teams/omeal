package com.shinhan.omeal.dto.delivery;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class DeliveryHistoryDTO {
    private LocalDateTime date;
    private String menu;
    private String deliveryAddr;
    private DeliveryStatus status;

}
