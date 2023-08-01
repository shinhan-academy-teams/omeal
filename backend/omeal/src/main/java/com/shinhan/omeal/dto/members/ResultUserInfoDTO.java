package com.shinhan.omeal.dto.members;

import com.shinhan.omeal.entity.Card;
import com.shinhan.omeal.entity.Members;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResultUserInfoDTO {
    // 회원 정보 응답 DTO
    private String memberName;
    private String memberNick;
    private String memberTel;
    private String memberAddr;
    private Card card;

    public ResultUserInfoDTO(Members members) {
        this.memberName = members.getMemberName();
        this.memberNick = members.getMemberNick();
        this.memberTel = members.getMemberTel();
        this.memberAddr = members.getMemberAddr();
        this.card = members.getCard();
    }
}
