package com.shinhan.omeal.entity;

import com.shinhan.omeal.dto.members.CardDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Comment;

import javax.persistence.*;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
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

    public static Card toEntity(CardDTO card){
        return Card.builder()
                .serialNumber(card.getSerialNumber())
                .validate(card.getExpiryDate())
                .cvc(card.getCvc())
                .cardPwd(card.getCardPwd())
                .build();
    }

}
