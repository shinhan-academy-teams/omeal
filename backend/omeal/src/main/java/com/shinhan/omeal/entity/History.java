package com.shinhan.omeal.entity;

import com.shinhan.omeal.dto.subscription.SubscriptionCategory;
import com.shinhan.omeal.dto.subscription.SubscriptionType;
import org.hibernate.annotations.Comment;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "HISTORY")
public class History {

    @Id
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

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    @Comment("구독 시작일")
    private Date startDate;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    @Comment("구독 종료일")
    private Date endDate;

}
