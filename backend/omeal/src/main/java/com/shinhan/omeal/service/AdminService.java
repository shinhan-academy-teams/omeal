package com.shinhan.omeal.service;

import com.shinhan.omeal.dto.members.MemberRole;
import com.shinhan.omeal.dto.members.MembersDTO;
import com.shinhan.omeal.entity.Members;
import com.shinhan.omeal.repository.MembersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final MembersRepository membersRepository;

    // 전체 회원 조회
    public List<MembersDTO> getMemberList(){
        List<Members> membersList = membersRepository.findAll();
        return membersList.stream().map(members -> members.toDTO()).collect(Collectors.toList());
    }

    // 회원 role 변경
    @Transactional
    public boolean updateMemberRole(MembersDTO membersDTO, MemberRole role){
        try{
            Members mem = membersRepository.findById(membersDTO.getMemberId()).get();
            if(mem==null) {
                throw new Exception("찾는 맴버가 존재 하지 않습니다. 예외 발생!!!");
            }

            mem.updateMemberRole(role);

            return true;
        }catch (Exception e){
            return false;
        }
    }
}
