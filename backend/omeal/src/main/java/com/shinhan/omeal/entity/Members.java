package com.shinhan.omeal.entity;

import com.shinhan.omeal.dto.members.MemberGrade;
import com.shinhan.omeal.dto.members.MemberRole;
import com.shinhan.omeal.dto.members.MembersDTO;
import com.shinhan.omeal.dto.members.MyPageUserInfoDTO;
import lombok.*;
import org.hibernate.annotations.Comment;

import javax.persistence.*;
import java.util.List;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "MEMBERS")
@ToString
public class Members {

    @Id
    @Comment("회원 아이디(이메일)")
    private String memberId;

    @Column(nullable = false)
    @Comment("회원 비밀번호")
    private String memberPwd;

    @Column(nullable = false)
    @Comment("회원 이름")
    private String memberName;

    @Column(nullable = false, unique = true)
    @Comment("닉네임")
    private String memberNick;

    @Column(nullable = false, unique = true)
    @Comment("연락처")
    private String memberTel;

    @Column(nullable = false)
    @Comment("주소")
    private String memberAddr;

    @OneToOne
    @JoinColumn(name = "CARD_NO")
    @Comment("카드 정보")
    private Card card;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Comment("회원 등급")
    private MemberGrade memberGrade = MemberGrade.날계란;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Comment("관리자 권한")
    private MemberRole memberRole = MemberRole.USER;

    @ManyToMany
    @JoinTable(name = "MEMBER_ALLERGY", joinColumns = @JoinColumn(name = "MEMBER_ID"),
            inverseJoinColumns = @JoinColumn(name = "ALLERGY_CODE"))
    @Comment("멤버별 알레르기 목록")
    private List<Allergy> memberAllergy;

    // 마이페이지 - 회원 정보 수정
    public void updateUserInfo(MyPageUserInfoDTO userInfo) {
        this.memberAddr = userInfo.getMemberAddr();
        this.memberNick = userInfo.getMemberNick();
        this.memberPwd = userInfo.getMemberPwd();
        this.memberTel = userInfo.getMemberTel();
    }

    // 회원 알레르기 정보 확인
    public List<Allergy> getMemberAllergyInfo() {
        return this.memberAllergy;
    }

    // 회원 알레르기 정보 업데이트
    public void updateAllergy(List<Allergy> allergyList) {
        this.memberAllergy = allergyList;
    }

    // 회원 알레르기 유무 확인
    public boolean hasNotAllergy() {
        return this.memberAllergy.isEmpty();
    }

    public static Members toEntity(MembersDTO dto) {
        return Members.builder()
                .memberId(dto.getMemberId())
                .memberPwd(dto.getMemberPwd())
                .memberName(dto.getMemberName())
                .memberNick(dto.getMemberNick())
                .memberTel(dto.getMemberTel())
                .memberAddr(dto.getMemberAddr())
                .build();
    }

    public static Members toEntityWithCard(MembersDTO dto, Card card) {
        return Members.builder()
                .memberId(dto.getMemberId())
                .memberPwd(dto.getMemberPwd())
                .memberName(dto.getMemberName())
                .memberNick(dto.getMemberNick())
                .memberTel(dto.getMemberTel())
                .memberAddr(dto.getMemberAddr())
                .card(card)
                .memberGrade(MemberGrade.날계란)
                .memberRole(MemberRole.USER)
                .build();
    }

    // 등급 업데이트를 위한 메소드 (No Setter)
    public void updateMemberGrade(MemberGrade memberGrade){
        this.memberGrade = memberGrade;
    }

}
