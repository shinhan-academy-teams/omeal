package com.shinhan.omeal.service;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeliveryScheduler {

    final TodayMealService todayMealService;

    /*
    오전6시에 배송준비
     */
    @Scheduled(cron = "0 0 6 * * *")
    public void prepareDelivery() {
        todayMealService.prepareTodayMeal();
    }

    /*
    오전8시 1차 배송 확인
    아침구독 배송완료&점심구독 배송시작
     */
    @Scheduled(cron = "0 0 8 * * *")
    public void morningDelivery() {
        todayMealService.changeDeliveryStatus("점심", "아침");
    }

    /*
    오후12시 2차 배송 확인
    점심구독 배송완료&저녁구독 배송시작
    */
    @Scheduled(cron = "0 0 12 * * *")
    public void lunchDelivery() {
        todayMealService.changeDeliveryStatus("저녁","점심");
    }

    /*
    오후19시 3차 배송 확인
    저녁구독 배송완료
    */
    @Scheduled(cron = "0 0 19 * * *")
    public void dinnerDelivery() {
        todayMealService.changeDeliveryStatus(null, "저녁");
    }

}
