package com.shinhan.omeal.dto.members;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
public class CardDTO {
    private MembersDTO member;
    private String serialNumber; // 카드 번호
    private String expiryDate; // 유효 기간
    private Integer cvc;
    private Integer cardPwd;
}
