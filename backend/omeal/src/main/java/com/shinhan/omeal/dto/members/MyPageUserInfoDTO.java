package com.shinhan.omeal.dto.members;

public class MyPageUserInfoDTO {
    /*
    이름
    닉네임
    이메일(수정 불가)
    비밀번호
    휴대폰 번호
    주소
    * */
    private final String memberName;
    private String memberNick;
    private String memberPwd;
    private String memberTel;
    private String memberAddr;

    public MyPageUserInfoDTO(String memberName, String memberNick,
                             String memberPwd, String memberTel, String memberAddr){
        this.memberName=memberName;
        this.memberNick=memberNick;
        this.memberPwd=memberPwd;
        this.memberTel=memberTel;
        this.memberAddr=memberAddr;
    }

    public String getMemberNick() {
        return memberNick;
    }

    public String getMemberName() {
        return memberName;
    }

    public String getMemberTel() {
        return memberTel;
    }

    public String getMemberAddr() {
        return memberAddr;
    }

    public void setMemberNick(String memberNick) {
        this.memberNick = memberNick;
    }

    public void setMemberPwd(String memberPwd) {
        this.memberPwd = memberPwd;
    }

    public void setMemberTel(String memberTel) {
        this.memberTel = memberTel;
    }

    public void setMemberAddr(String memberAddr) {
        this.memberAddr = memberAddr;
    }
}
