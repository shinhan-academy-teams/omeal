package com.shinhan.omeal.entity;

import javax.persistence.*;
import org.hibernate.annotations.Comment;

import java.util.Date;

@Entity
@Table(name = "CARD")
@SequenceGenerator(name = "CARD_SEQ_GEN", sequenceName = "CARD_SEQ", initialValue = 1, allocationSize = 1)
public class Card {

    @Id
    @Column(name = "CARD_NO")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CARD_SEQ_GEN")
    @Comment("인덱스")
    private Long cardNo;

    @Column(nullable = false)
    @Comment("카드 번호")
    private String serialNumber;

    @Column(nullable = false)
    @Comment("카드 CVC 번호 3자리")
    private Integer cvc;

    @Column(nullable = false)
    @Comment("카드 유효기간")
    private String validate;

    @Column(nullable = false)
    @Comment("카드 비밀번호 4자리")
    private Integer cardPwd;

}
