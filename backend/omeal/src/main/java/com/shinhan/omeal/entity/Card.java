package com.shinhan.omeal.entity;

import javax.persistence.*;

import com.shinhan.omeal.dto.members.CardDTO;
import lombok.Builder;
import lombok.Setter;
import org.hibernate.annotations.Comment;

import java.util.Date;

@Builder
@Setter
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
    //@Temporal(TemporalType.DATE) : (용희)편의상 String으로 바꿨기 때문에 @Temporal 지웠음.
    @Comment("카드 유효기간")
    private String validate;

    @Column(nullable = false)
    @Comment("카드 비밀번호 4자리")
    private Integer cardPwd;

    public static Card toEntity(CardDTO card){
        return Card.builder()
                .serialNumber(card.getSerialNumber())
                .validate(card.getExpiryDate())
                .cvc(card.getCvc())
                .cardPwd(card.getCardPwd())
                .build();
    }

}
