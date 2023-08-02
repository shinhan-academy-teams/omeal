package com.shinhan.omeal.dto.members;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;

@Getter
@Setter
@ToString
@Builder
public class CardDTO {
    private MembersDTO member;
    private String serialNumber; // 카드번호
    private String expiryDate; // 신용카드의 유효기간 영어 참조 : https://owldictionary.com/best-before-date/
    private Integer cvc;
    private Integer cardPwd;
}
