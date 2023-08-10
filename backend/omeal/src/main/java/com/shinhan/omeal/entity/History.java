package com.shinhan.omeal.entity;

import com.shinhan.omeal.dto.subscription.PaymentDTO;
import com.shinhan.omeal.dto.subscription.SubscriptionCategory;
import com.shinhan.omeal.dto.subscription.SubscriptionStatus;
import com.shinhan.omeal.dto.subscription.SubscriptionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "HISTORY")
@SequenceGenerator(name = "HISTORY_SEQ_GEN", sequenceName = "HISTORY_SEQ", initialValue = 1, allocationSize = 1)
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "HISTORY_SEQ_GEN")
    @Comment("구독 번호")
    private Long subNo;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    @Comment("구독 회원 아이디")
    private Members member;

    @Enumerated(EnumType.STRING)
    @Comment("구독 타입")
    private SubscriptionType subType;

    @Enumerated(EnumType.STRING)
    @Comment("입맛 성향에따른 식사 타입")
    private SubscriptionCategory category;

    @Enumerated(EnumType.STRING)
    @Comment("구독상태")
    private SubscriptionStatus status;

    @Comment("결제일시")
    private LocalDateTime payDate;

    @Column(nullable = false)
    @Comment("구독 시작일")
    private LocalDate startDate;

    @Column(nullable = false)
    @Comment("구독 종료일")
    private LocalDate endDate;

    public PaymentDTO getPaymentDTO() {
        PaymentDTO dto = new PaymentDTO();
        dto.setDate(this.payDate);
        dto.setStartDate(this.startDate);
        dto.setEndDate(this.endDate);
        dto.setCategory(this.category);
        return dto;
    }

    // 만료된 구독 히스토리 업데이트
    public void updateEndHistory() {
        this.status = SubscriptionStatus.END;
    }

}
