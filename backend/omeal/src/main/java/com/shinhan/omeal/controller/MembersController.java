package com.shinhan.omeal.controller;

import com.shinhan.omeal.dto.members.CardDTO;
import com.shinhan.omeal.dto.members.MembersDTO;
import com.shinhan.omeal.entity.Members;
import com.shinhan.omeal.service.MembersService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@Slf4j
public class MembersController {

    private final MembersService membersService;

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

    // 로그인
    @PostMapping(value = "/sign-in", consumes = "application/json", produces = "application/json")
    public MembersDTO signIn(@RequestBody MembersDTO membersDto, HttpServletRequest httpServletRequest) {
        MembersDTO dto = membersService.signIn(membersDto);

        if(dto!=null){ // 로그인 성공 => 세션 생성
            httpServletRequest.getSession().invalidate(); // 세션을 생성하기 전에 기존의 세션 파기
            HttpSession session = httpServletRequest.getSession(true); // Session이 없으면 생성
            session.setAttribute("userDTO", dto); // 세션에 userId를 넣어줌
            session.setMaxInactiveInterval(0); // 유효시간 무한
        }

        return dto;
    }

    // 회원가입
    @PostMapping(value = "/sign-up", consumes = "application/json", produces = "text/plain;charset=utf-8")
    public String signUp(@RequestBody CardDTO cardDto) {
        log.info("회원 가입 완료 클릭 : " + cardDto.toString());
        return membersService.signUp(cardDto); // 성공시 "success"
    }

    // 로그아웃
    @GetMapping("/log-out")
    public String logOut(HttpServletRequest httpServletRequest){
        HttpSession session = httpServletRequest.getSession(false);
        if(session==null)
            return "Fail";
        else {
            session.invalidate();
            return "Success";
        }
    }
}
