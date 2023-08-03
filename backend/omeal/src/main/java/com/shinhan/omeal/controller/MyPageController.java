package com.shinhan.omeal.controller;

import com.shinhan.omeal.dto.members.CardDTO;
import com.shinhan.omeal.dto.members.MyPageUserInfoDTO;
import com.shinhan.omeal.dto.members.ResultUserInfoDTO;
import com.shinhan.omeal.dto.subscription.UserSubInfoDTO;
import com.shinhan.omeal.service.CardService;
import com.shinhan.omeal.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mypage")
public class MyPageController {
    private final MyPageService mypageservice;
    private final CardService cardService;

    // 회원정보 요청
    @GetMapping("/user-info")
    public ResponseEntity<ResultUserInfoDTO> userInfoGet(String memId) {
        ResultUserInfoDTO member = mypageservice.getUserInfo(memId);
        return ResponseEntity.ok(member);
    }

    // 회원 정보 수정
    @PutMapping(value = "/user-info",consumes = "application/json")
    public String userInfoUpdate(@RequestBody MyPageUserInfoDTO dto) {
        return mypageservice.update(dto);
    }

    // 회원의 구독과 알러지 정보 응답
    @GetMapping("/sub-info")
    public ResponseEntity<UserSubInfoDTO> subInfoGet(String memId){
        UserSubInfoDTO dto = mypageservice.getSubInfo(memId);
        return ResponseEntity.ok(dto);
    }

    // 회원의 카드 정보 요청
    @GetMapping ("/card-info")
    public ResponseEntity<CardDTO> userCardGet(String memId) {
        CardDTO card = cardService.select(memId);
        return ResponseEntity.ok(card);
    }

    // 회원의 카드 정보 수정
    @PutMapping("/card-info")
    public String userCardUpdate(@RequestBody CardDTO cardDTO, String memId){
        return cardService.update(cardDTO, memId);
    }
}
