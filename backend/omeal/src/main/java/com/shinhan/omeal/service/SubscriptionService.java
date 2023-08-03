package com.shinhan.omeal.service;

import com.shinhan.omeal.dto.members.MemberGrade;
import com.shinhan.omeal.entity.Members;
import com.shinhan.omeal.entity.Subscription;
import com.shinhan.omeal.repository.MembersRepository;
import com.shinhan.omeal.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    final MembersRepository memRepo;
    final SubscriptionRepository subRepo;

    // 회원의 연속 기간 가져오기
    public int getContinuousDays(String memberId) {
        int days = 0;
        Members member = memRepo.findById(memberId).orElse(null);
        Subscription sub = subRepo.findByMember(member);
        if (sub == null) {
            days = -1;
        } else {
            days = subRepo.findContinuousDaysByMemberId(memberId);
        }
        return days;
    }

    // 로그인 시 => 회원등급 업데이트 & Front에 전송까지
    public Members updateMemberGrade(Members member){
        String memberId = member.getMemberId();

        // 1. 회원 ID를 이용해서 => 구독 기간 가져오고 (by경윤)
        int days = getContinuousDays(memberId);

        // 2. 구독 기간을 이용해서 (1)등급 계산 & (2)업데이트 (by용희)
        MemberGrade memberGrade = calMemberGrade(days);
        member.updateMemberGrade(memberGrade);
        memRepo.save(member);

        // 3. 마지막으로 등급을 리턴 => 로그인 시 전송되게끔
        return member;
    }

    // 2-1. 구독 기간을 이용해서 등급 계산
    public MemberGrade calMemberGrade(int days){
        MemberGrade memberGrade = MemberGrade.날계란;

        // 3, 6, 12개월 별로 분류
        if(days >= 365){
            memberGrade = MemberGrade.훈제란;
        }else if(days < 365 && days >= 180){
            memberGrade = MemberGrade.완숙란;
        }else if(days < 180 && days >= 90){
            memberGrade = MemberGrade.반숙란;
        }

        return memberGrade;
    }

    // 2-2. 계산한 등급을 DB에 업데이트
//    public Members updateById(Members member, MemberGrade memberGrade){
//        // 회원 ID로부터 회원등급 & 구독기간 가져오기
//        //Members member = memRepo.findById(memberId).orElseThrow(()->new NoSuchElementException());
//
//        // 회원등급 update
//        member.updateMemberGrade(memberGrade);
//
//        // 그 member 객체를 return
//        return member;
//    }

}
