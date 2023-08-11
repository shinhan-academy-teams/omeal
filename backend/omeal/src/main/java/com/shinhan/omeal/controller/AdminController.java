package com.shinhan.omeal.controller;

import com.shinhan.omeal.dto.members.MemberRole;
import com.shinhan.omeal.dto.members.MembersDTO;
import com.shinhan.omeal.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {
    private final AdminService adminService;

    // 회원 전체 조회
    @GetMapping("/mem-list")
    public List<MembersDTO> getMemberList(){
        return adminService.getMemberList();
    }

    // 유저 -> 관리자 변경
    @PutMapping("/change-user")
    public boolean updateUserToAdmin(@RequestBody MembersDTO membersDTO){
       return adminService.updateMemberRole(membersDTO, MemberRole.ADMIN);
    }

    // 유저 -> 관리자 변경
    @PutMapping("/change-admin")
    public boolean updateAdminToUser(@RequestBody MembersDTO membersDTO){
        return adminService.updateMemberRole(membersDTO, MemberRole.USER);
    }
}
