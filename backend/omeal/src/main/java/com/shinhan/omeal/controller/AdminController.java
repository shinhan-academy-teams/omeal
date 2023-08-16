package com.shinhan.omeal.controller;

import com.shinhan.omeal.dto.admin.FeedbackResultDTO;
import com.shinhan.omeal.dto.members.MemberRole;
import com.shinhan.omeal.dto.members.MembersDTO;
import com.shinhan.omeal.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    // 회원 전체 조회
    @GetMapping("/mem-list")
    public List<MembersDTO> getMemberList() {
        return adminService.getMemberList();
    }

    // 유저 -> 관리자 변경
    @PutMapping("/change-user")
    public boolean updateUserToAdmin(@RequestBody MembersDTO membersDTO) {
        return adminService.updateMemberRole(membersDTO, MemberRole.ADMIN);
    }

    // 유저 -> 관리자 변경
    @PutMapping("/change-admin")
    public boolean updateAdminToUser(@RequestBody MembersDTO membersDTO) {
        return adminService.updateMemberRole(membersDTO, MemberRole.USER);
    }

    // 싫어요, 좋아요 조회
    @GetMapping("/feedback-result")
    public ResponseEntity<HashMap<String, List<FeedbackResultDTO>>> getFeedbackResult() {
        HashMap<String, List<FeedbackResultDTO>> feedbackResultDTOMap = new HashMap<>();

        feedbackResultDTOMap.put("dislike", adminService.getDislike());
        feedbackResultDTOMap.put("like", adminService.getLike());

        return ResponseEntity.ok(feedbackResultDTOMap);
    }

}
