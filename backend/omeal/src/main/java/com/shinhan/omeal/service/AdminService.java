package com.shinhan.omeal.service;

import com.shinhan.omeal.dto.admin.FeedbackResultDTO;
import com.shinhan.omeal.dto.members.MemberRole;
import com.shinhan.omeal.dto.members.MembersDTO;
import com.shinhan.omeal.entity.Members;
import com.shinhan.omeal.repository.FeedbackRepository;
import com.shinhan.omeal.repository.MembersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final MembersRepository membersRepository;
    private final FeedbackRepository feedbackRepository;
    List<FeedbackResultDTO> like = new ArrayList<>(); // 좋아요
    List<FeedbackResultDTO> dislike = new ArrayList<>(); // 싫어요

    // 전체 회원 조회
    public List<MembersDTO> getMemberList() {
        List<Members> membersList = membersRepository.findAll();
        return membersList.stream().map(Members::toDTO).collect(Collectors.toList());
    }

    // 회원 role 변경
    @Transactional
    public boolean updateMemberRole(MembersDTO membersDTO, MemberRole role) {
        try {
            Members mem = membersRepository.findById(membersDTO.getMemberId()).orElse(null);
            if (mem == null) {
                throw new Exception("찾는 맴버가 존재 하지 않습니다. 예외 발생!!!");
            }

            mem.updateMemberRole(role);

            return true;
        } catch (Exception e) {
            return false;
        }
    }


    // 매주 월요일 자정마다 업데이트, List에 값을 저장
    @Scheduled(cron = "0 0 0 * * 0")
    public void updateFeedback() {
        like.clear();
        dislike.clear();
        getDislike();
        getLike();
    }

    // 메뉴 관리 - 싫어요
    public List<FeedbackResultDTO> getDislike() {

        // 만약 값이 없으면 값을 가져옴
        if (dislike.isEmpty()) {
            dislike = feedbackRepository.getTop5FeedbackDislike();
        }

        return dislike;
    }

    // 메뉴 관리 - 좋아요
    public List<FeedbackResultDTO> getLike() {

        // 만약 값이 없으면 값을 가져옴
        if (like.isEmpty()) {
            like = feedbackRepository.getTop5FeedbackLike();
        }

        return like;
    }
}
