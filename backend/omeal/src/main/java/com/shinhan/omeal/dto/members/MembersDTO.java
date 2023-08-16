package com.shinhan.omeal.dto.members;

import com.shinhan.omeal.entity.Allergy;
import com.shinhan.omeal.entity.Card;
import com.shinhan.omeal.entity.Members;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@Builder
@ToString
public class MembersDTO {
    private String memberId;
    private String memberPwd;
    private String memberName;
    private String memberNick;
    private String memberTel;
    private String memberAddr;
    private Card card;
    @Builder.Default
    private MemberGrade memberGrade = MemberGrade.날계란;
    @Builder.Default
    private MemberRole memberRole = MemberRole.USER;
    private List<Allergy> memberAllergy;
    private int continuousDays; // 연속 구독 기간(일)
    private boolean Sub; // 현재 구독 여부

    public static MembersDTO toMembersDtoForSignIn(Members member, int continuousDays) {
        return MembersDTO.builder()
                .memberId(member.getMemberId())
                .memberName(member.getMemberName())
                .memberNick(member.getMemberNick())
                .memberGrade(member.getMemberGrade())
                .continuousDays(continuousDays)
                .build();
    }
}
