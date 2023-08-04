package com.shinhan.omeal.controller;

import com.shinhan.omeal.dto.todayMeal.TodayMealDTO;
import com.shinhan.omeal.service.TodayMealService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/today-meal")
public class TodayMealController {

    final TodayMealService tmService;

    // 하단의 '오늘의 밀' 아이콘 눌렀을 때 뜨는 첫 페이지
    @GetMapping(value = "/delivery-info")
    public TodayMealDTO getDeliveryInfo(String memberId){
        return tmService.getDeliveryInfo(memberId);
    }
}
