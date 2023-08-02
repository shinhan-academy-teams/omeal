package com.shinhan.omeal.service;

import com.shinhan.omeal.dto.members.MembersDTO;
import com.shinhan.omeal.entity.Members;
import com.shinhan.omeal.repository.MembersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class MembersService {

    final MembersRepository memberRepo;

    // 회원 가입
    public String signUp(HashMap<String, String> obj) {
        MembersDTO dto = MembersDTO.builder()
                .memberId(obj.get("memberId"))
                .memberPwd(obj.get("memberPwd"))
                .memberName(obj.get("memberName"))
                .memberNick(obj.get("memberNick"))
                .memberTel(obj.get("memberTel"))
                .memberAddr(obj.get("memberAddr"))
                .build();

        memberRepo.save(Members.toEntity(dto));
        return "Sign Up Complete";
    }

    // 닉네임 중복 체크
    public int isNickDuplicated(String memberNick) {
        int rst = 0;

        Members member = memberRepo.findByMemberNick(memberNick);
        if(member == null) { // 아이디 중복 아님. 아이디 사용 가능.
            rst = 1;
        } else { // 아이디 중복. 아이디 사용 불가.
            rst = -1;
        }

        return rst;
    }


    // 아이디 중복 체크
    public int isIdDuplicated(String memberId) {
        int rst = 0;

        Members member = memberRepo.findById(memberId).orElse(null);
        if(member == null) { // 아이디 중복 아님. 아이디 사용 가능.
            rst = 1;
        } else { // 아이디 중복. 아이디 사용 불가.
            rst = -1;
        }

        return rst;
    }
}
