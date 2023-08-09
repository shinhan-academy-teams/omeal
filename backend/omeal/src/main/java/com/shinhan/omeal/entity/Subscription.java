package com.shinhan.omeal.entity;

import com.shinhan.omeal.dto.delivery.DeliveryContainer;
import com.shinhan.omeal.dto.delivery.DeliveryTime;
import com.shinhan.omeal.dto.subscription.SubscriptionCategory;
import com.shinhan.omeal.dto.subscription.SubscriptionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "SUBSCRIPTION")
@SequenceGenerator(name = "SUB_SEQ_GEN", sequenceName = "SUB_SEQ", initialValue = 1, allocationSize = 1)
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SUB_SEQ_GEN")
    @Comment("구독 번호")
    private Long subNo;

    @OneToOne
    @JoinColumn(name = "MEMBER_ID")
    @Comment("구독한 회원")
    private Members member;

    @Enumerated(EnumType.STRING)
    @Comment("구독 타입")
    private SubscriptionType subType;

    @Enumerated(EnumType.STRING)
    @Comment("입맛 성향에따른 식사 타입")
    private SubscriptionCategory category;

    @Column(nullable = false)
    @Comment("배송지")
    private String deliveryAddr;

    @Enumerated(EnumType.STRING)
    @Comment("배송 용기")
    private DeliveryContainer container;

    @Enumerated(EnumType.STRING)
    @Comment("배송 받을 시간")
    private DeliveryTime mealTime;

    @CreationTimestamp
    @Comment("결제 일시")
    private LocalDateTime payDate;

    @Column(nullable = false)
    @Comment("구독 시작일")
    private LocalDate startDate;

    @Column(nullable = false)
    @Comment("구독 종료일")
    private LocalDate endDate;

    // 마이페이지 - 구독 정보만 가져오기
    public List<String> getSubDTO(){
        List<String> list = new ArrayList<>();
        list.add(String.valueOf(this.subType));
        list.add(String.valueOf(this.category));
        list.add(String.valueOf(this.container));

        return list;
    }

    // 구독 회원 알레르기 유무
    public boolean hasNotAllergy() {
        return this.member.hasNotAllergy();
    }

    // 구독 회원 알레르기 정보 가져오기
    public List<Allergy> getMemberAllergyInfo() {
        return this.member.getMemberAllergyInfo();
    }

}
