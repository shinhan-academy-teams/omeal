package com.shinhan.omeal;

import com.shinhan.omeal.dto.members.MyPageUserInfoDTO;
import com.shinhan.omeal.entity.Members;
import com.shinhan.omeal.repository.MembersRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class MemberTest {
    @Autowired
    MembersRepository memRepo;

    @Test
    void findMember() {
        String memID = "test@test.com";
        MyPageUserInfoDTO mem = memRepo.findByMemberId(memID);
        System.out.println(mem.getMemberAddr()+" "+mem.getMemberNick()+" "+mem.getMemberName()+" "+mem.getMemberTel());
        mem.setMemberAddr("서울");
        mem.setMemberNick("고구마");
        mem.setMemberPwd("4321");
        mem.setMemberTel("010-1111-7777");

        Members m = Members
        memRepo.save(m);
    }
}
