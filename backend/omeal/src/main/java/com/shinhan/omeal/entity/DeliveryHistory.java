package com.shinhan.omeal.entity;

import com.shinhan.omeal.dto.delivery.DeliveryHistoryDTO;
import com.shinhan.omeal.dto.delivery.DeliveryStatus;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@ToString
@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "DELIVERY_HISTORY")
@SequenceGenerator(name = "DELIVERY_SEQ_GEN", sequenceName = "DELIVERY_SEQ", initialValue = 1, allocationSize = 1)
public class DeliveryHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "DELIVERY_SEQ_GEN")
    @Comment("배송 번호")
    private Long deliveryNo;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    @Comment("배송 회원 아이디")
    private Members member;

    @Column(nullable = false)
    @Comment("베송된 메뉴")
    private String menu;

    @Enumerated(EnumType.STRING)
    @Comment("배송 현황")
    private DeliveryStatus status = DeliveryStatus.배송준비중;

    @Column(nullable = false)
    @Comment("배송지")
    private String deliveryAddr;

    @CreationTimestamp
    @Comment("배송 일시")
    private LocalDateTime deliveryDate;


    // 배송 현황 업데이트
    public void updateDeliveryStatus(DeliveryStatus status) {
        this.status = status;
    }

    public DeliveryHistoryDTO getDeliveryHistoryDTO() {
        DeliveryHistoryDTO dto = new DeliveryHistoryDTO();
        dto.setDate(this.deliveryDate);
        dto.setMenu(this.menu);
        dto.setDeliveryAddr(this.deliveryAddr);
        dto.setStatus(this.status);
        return dto;
    }

}
