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
    private MemberGrade memberGrade = MemberGrade.날계란;
    private MemberRole memberRole = MemberRole.USER;
    private List<Allergy> memberAllergy;

    public static MembersDTO toMembersDtoForSignIn(Members member) {
        return MembersDTO.builder()
                .memberId(member.getMemberId())
                .memberGrade(member.getMemberGrade())
                .build();
    }
}
