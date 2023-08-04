package com.shinhan.omeal.entity;

import com.shinhan.omeal.dto.members.CardDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Comment;

import javax.persistence.*;



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

    // card 정보를 cardDTO로 넘길때
    public CardDTO createDTO(){
        CardDTO dto = CardDTO.builder().build();
        dto.setCardPwd(this.cardPwd);
        dto.setCvc(this.cvc);
        dto.setExpiryDate(this.validate);
        dto.setSerialNumber(this.serialNumber);

        return dto;
    }

    // card 정보 수정
    public void updateCardInfo(CardDTO dto){
        this.cardPwd = dto.getCardPwd();
        this.cvc = dto.getCvc();
        this.validate = dto.getExpiryDate();
        this.serialNumber = dto.getSerialNumber();
    }

}
