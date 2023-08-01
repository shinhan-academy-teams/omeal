package com.shinhan.omeal.service;

import com.shinhan.omeal.dto.members.CardDTO;
import com.shinhan.omeal.dto.members.MyPageUserInfoDTO;
import com.shinhan.omeal.dto.members.ResultUserInfoDTO;
import com.shinhan.omeal.entity.Members;
import com.shinhan.omeal.repository.MembersRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
@Slf4j
public class MembersService {

    final MembersRepository memRepo;

    // 카드정보 입력 후 회원가입 완료 버튼 눌렀을 때
    public void signUp(CardDTO cardDto){
        log.info("Date 형식으로 바꿔줄 놈 : "+cardDto.getExpiryDate());
        String expiryDate = cardDto.getExpiryDate();
        log.info(String.valueOf(expiryDate));
        String[] arr = expiryDate.split("/");
        String month = arr[0];
        String year = "20" + arr[1];
        LocalDate ld = LocalDate.parse(year+month, DateTimeFormatter.ofPattern("yyyy/MM"));
        log.info(String.valueOf(ld));
        Integer cvc = cardDto.getCvc();
        Integer cardPwd = cardDto.getCardPwd();

        //cRepo.save();
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
