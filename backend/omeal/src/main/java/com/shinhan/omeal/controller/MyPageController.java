package com.shinhan.omeal.controller;

import com.shinhan.omeal.dto.members.MyPageUserInfoDTO;
import com.shinhan.omeal.dto.members.ResultUserInfoDTO;
import com.shinhan.omeal.dto.subscription.SubscriptionDTO;
import com.shinhan.omeal.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mypage")
public class MyPageController {
    private final MyPageService mypageservice;

    // 회원정보 요청
    @GetMapping("/user-info")
    public ResponseEntity<ResultUserInfoDTO> userInfoGet(String memId) {
        ResultUserInfoDTO member = mypageservice.getUserInfo(memId);
        return ResponseEntity.ok(member);
    }

    // 회원 정보 수정
    @PostMapping(value = "/user-info",consumes = "application/json")
    public String userInfoUpdate(@RequestBody MyPageUserInfoDTO dto) {
        System.out.println(dto);
        return mypageservice.update(dto);
    }

    // 회원의 구독과 알러지 정보 응답
    @GetMapping("/sub-info")
    public ResponseEntity<SubscriptionDTO> subInfoGet(String memId){
        SubscriptionDTO dto = mypageservice.getSubInfo(memId);
        return ResponseEntity.ok(dto);
    }
}
