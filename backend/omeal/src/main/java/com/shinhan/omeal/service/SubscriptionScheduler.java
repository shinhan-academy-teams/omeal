package com.shinhan.omeal.service;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubscriptionScheduler {

    final SubscriptionService subscriptionService;

    /*
    자정마다 구독정보 업데이트
     */
    @Scheduled(cron = "0 0 0 * * *")
    public void prepareDelivery() {
        subscriptionService.updateSubscriptionInfo();
    }
}
