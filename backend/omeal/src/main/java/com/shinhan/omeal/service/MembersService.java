package com.shinhan.omeal.service;

import com.shinhan.omeal.dto.members.MyPageUserInfoDTO;
import com.shinhan.omeal.dto.members.ResultUserInfoDTO;
import com.shinhan.omeal.entity.Members;
import com.shinhan.omeal.repository.MembersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MembersService {

    final MembersRepository memRepo;

    @Transactional
    public Members update(MyPageUserInfoDTO userInfo) {
        Members mem = memRepo.findByMemberId(userInfo.getMemberId());
        mem.setMemberAddr(userInfo.getMemberAddr());
        mem.setMemberNick(userInfo.getMemberNick());
        mem.setMemberPwd(userInfo.getMemberPwd());
        mem.setMemberTel(userInfo.getMemberTel());

        return mem;
    }

    public ResultUserInfoDTO getInfo(String memId) {
        Members mem = memRepo.findByMemberId(memId);
        ResultUserInfoDTO remem = new ResultUserInfoDTO(mem);
        return remem;
    }
}
