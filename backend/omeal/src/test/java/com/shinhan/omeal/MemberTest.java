package com.shinhan.omeal;

import com.shinhan.omeal.dto.members.MyPageUserInfoDTO;
import com.shinhan.omeal.dto.members.ResultUserInfoDTO;
import com.shinhan.omeal.entity.Members;
import com.shinhan.omeal.repository.MembersRepository;
import com.shinhan.omeal.service.MembersService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class MemberTest {
    @Autowired
    MembersRepository memRepo;

    @Autowired
    MembersService memSer;

    @Test
    void getMemberInfo() {
        String memID = "kky417@kakao.com";
        ResultUserInfoDTO dto = memSer.getInfo(memID);
        System.out.println("결과 : "+dto.getMemberName()+" "+dto.getMemberNick()+" "+dto.getMemberAddr()+" "+dto.getMemberTel());
    }

    @Test
    void updateMemberInfo() {
        String memID = "kky417@kakao.com";

        MyPageUserInfoDTO dto = MyPageUserInfoDTO.builder()
                .memberId(memID)
                .memberAddr("고양시 화신로 8888")
                .memberPwd("7777")
                .memberNick("티모대위")
                .memberTel("01099998888")
                .build();

        Members mem = memSer.update(dto); // 여기는 아직 수정 못한거

        mem = memRepo.findByMemberId(memID);
        System.out.println("1 : "+mem.getMemberAddr()+" "+mem.getMemberNick()+" "+mem.getMemberName()+" "+mem.getMemberTel());
    }
}
