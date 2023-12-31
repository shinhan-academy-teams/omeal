package com.shinhan.omeal.controller;

import com.shinhan.omeal.dto.todayMeal.FeedbackDTO;
import com.shinhan.omeal.dto.todayMeal.MenusDTO;
import com.shinhan.omeal.dto.todayMeal.TodayMealDTO;
import com.shinhan.omeal.service.TodayMealService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/today-meal")
public class TodayMealController {

    private final TodayMealService tmService;

    // 하단의 '오늘의 밀' 아이콘 눌렀을 때 뜨는 첫 페이지
    @GetMapping(value = "/delivery-info")
    public TodayMealDTO getDeliveryInfo(String memberId) {
        return tmService.getDeliveryInfo(memberId);
    }

    // 피드백 읽어오기
    @PostMapping(value = "/feedback")
    public MenusDTO[] getFeedback(@RequestBody FeedbackDTO dto) {
        return tmService.getFeedback(dto);
    }

    // 피드백 남기기
    @PutMapping(value = "/feedback", consumes = "application/json")
    public String submitFeedback(@RequestBody FeedbackDTO dto) {
        return tmService.submitFeedback(dto);
    }

}
