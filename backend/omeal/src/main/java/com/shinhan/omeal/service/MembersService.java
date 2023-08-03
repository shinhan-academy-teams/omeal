package com.shinhan.omeal.service;

import com.shinhan.omeal.dto.members.CardDTO;
import com.shinhan.omeal.dto.members.MembersDTO;
import com.shinhan.omeal.entity.Members;
import com.shinhan.omeal.entity.Card;
import com.shinhan.omeal.repository.CardRepository;
import com.shinhan.omeal.repository.MembersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MembersService {

    final MembersRepository memRepo;
    final CardRepository cRepo;

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
        return answer;
    }

    // 회원가입 (카드정보 입력 후 회원가입 버튼 눌렀을 때)
    @Transactional
    public String signUp(CardDTO dto){
        String answer = "success";

        // 카드 저장
        CardDTO cardDto = CardDTO.builder()
                .serialNumber(dto.getSerialNumber())
                .expiryDate(dto.getExpiryDate())
                .cvc(dto.getCvc())
                .cardPwd(dto.getCardPwd())
                .build();

        // CardDTO => Card Entity
        Card card = Card.toEntity(cardDto);
        cRepo.save(card);

        // 카드 정보와 함께 회원 가입
        Members member = Members.toEntityWithCard(dto.getMember(), card);
        memRepo.save(member);

        return answer;
    }
}
