package com.shinhan.omeal.controller;

import com.shinhan.omeal.service.MembersService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class MembersController {

    final MembersService membersService;

    // 회원 가입
    @PostMapping("/sign-up")
    public String signUp(@RequestBody HashMap<String, String> obj) {
        return membersService.signUp(obj);
    }

    // 닉네임 중복 체크
    @GetMapping("/sign-up/nick-check")
    public int isNickDuplicated(String memberNick) {
        return membersService.isNickDuplicated(memberNick);
    }

    // 아이디 중복 체크
    @GetMapping("/sign-up/id-check")
    public int isIdDuplicated(@RequestParam String memberId) {
        return membersService.isIdDuplicated(memberId);
    }

}
