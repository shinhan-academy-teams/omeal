package com.shinhan.omeal.dto.members;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
public class MyPageUserInfoDTO {
    /*
    회원 정보 수정 DTO

    이름
    닉네임
    이메일(수정 불가)
    비밀번호
    휴대폰 번호
    주소
    * */
    private String memberId;
    private String memberNick;
    private String memberPwd;
    private String memberTel;
    private String memberAddr;

    @Builder
    public MyPageUserInfoDTO(String memberId, String memberNick,
                             String memberPwd, String memberTel, String memberAddr) {
        this.memberId = memberId;
        this.memberNick = memberNick;
        this.memberPwd = memberPwd;
        this.memberTel = memberTel;
        this.memberAddr = memberAddr;
    }
}
