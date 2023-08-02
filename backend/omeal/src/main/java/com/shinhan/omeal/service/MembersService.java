package com.shinhan.omeal.service;

import com.shinhan.omeal.dto.members.CardDTO;
import com.shinhan.omeal.dto.members.MembersDTO;
import com.shinhan.omeal.dto.members.MyPageUserInfoDTO;
import com.shinhan.omeal.dto.members.ResultUserInfoDTO;
import com.shinhan.omeal.entity.Card;
import com.shinhan.omeal.entity.Members;
import com.shinhan.omeal.repository.CardRepository;
import com.shinhan.omeal.repository.MembersRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class MembersService {

    final MembersRepository memRepo;
    final CardRepository cRepo;
  
//     // 회원 가입
//     public String signUp(HashMap<String, String> obj) {
//         MembersDTO dto = MembersDTO.builder()
//                 .memberId(obj.get("memberId"))
//                 .memberPwd(obj.get("memberPwd"))
//                 .memberName(obj.get("memberName"))
//                 .memberNick(obj.get("memberNick"))
//                 .memberTel(obj.get("memberTel"))
//                 .memberAddr(obj.get("memberAddr"))
//                 .build();

//         memberRepo.save(Members.toEntity(dto));
//         return "Sign Up Complete";
//     }

    // 닉네임 중복 체크
    public int isNickDuplicated(String memberNick) {
        int rst = 0;

        Members member = memRepo.findByMemberNick(memberNick);
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

        Members member = memRepo.findById(memberId).orElse(null);
        if(member == null) { // 아이디 중복 아님. 아이디 사용 가능.
            rst = 1;
        } else { // 아이디 중복. 아이디 사용 불가.
            rst = -1;
        }

        return rst;
    }

    // 로그인
    public String signIn(MembersDTO membersDto){
        String answer = "fail";

        String loginId = membersDto.getMemberId();
        String loginPwd = membersDto.getMemberPwd();

        // 유효성 검사
        Members mem = memRepo.findById(loginId).orElse(null);
        if(mem != null){
            String memberPwd = mem.getMemberPwd();
            if(loginPwd.equals(memberPwd)){
                answer = "success";
            }
        }

        // MembersDTO => Members Entity
        //Members member = Members.toEntity(membersDto);
        //memRepo.save(member);

        return answer;
    }

    // 회원가입 (카드정보 입력 후 회원가입 버튼 눌렀을 때)
    @Transactional
    public String signUp(CardDTO cardDto){
        String answer = "success";

        // CardDTO => Card Entity
        Card card = Card.toEntity(cardDto);
        cRepo.save(card);

        return answer;
    }

    @Transactional
    public Members update(MyPageUserInfoDTO userInfo) {
        Members mem = memRepo.findById(userInfo.getMemberId()).get();
        mem.setMemberAddr(userInfo.getMemberAddr());
        mem.setMemberNick(userInfo.getMemberNick());
        mem.setMemberPwd(userInfo.getMemberPwd());
        mem.setMemberTel(userInfo.getMemberTel());

        return mem;
    }

    public ResultUserInfoDTO getInfo(String memId) {
        Members mem = memRepo.findById(memId).get();
        ResultUserInfoDTO remem = new ResultUserInfoDTO(mem);
        return remem;
    }
  
}
