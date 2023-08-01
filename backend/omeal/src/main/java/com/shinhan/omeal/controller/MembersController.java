package com.shinhan.omeal.controller;

import com.shinhan.omeal.dto.members.CardDTO;
import com.shinhan.omeal.service.MembersService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.shinhan.omeal.dto.members.MyPageUserInfoDTO;
import com.shinhan.omeal.dto.members.ResultUserInfoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@Slf4j
public class MembersController {

    private final MembersService membersService;

    @PostMapping(value = "/signup", consumes = "application/json", produces = "text/plain;charset=utf-8")
    public String signUp(@RequestBody CardDTO cardDto) {
        log.info("회원 가입 완료 클릭 : " + cardDto.toString());
        membersService.signUp(cardDto);

        return null;
    }

    // 회원정보 요청
    @GetMapping("/userInfo")
    public ResponseEntity<ResultUserInfoDTO> userInfoGet(String memId) {
        ResultUserInfoDTO member = membersService.getInfo(memId);
        return ResponseEntity.ok(member);
    }

    // 회원 정보 수정
    @PostMapping("/userInfo")
    public String userInfoUpdate(MyPageUserInfoDTO dto) {
        membersService.update(dto);
        return "success";
    }
}
