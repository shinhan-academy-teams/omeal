package com.shinhan.omeal.entity;

import org.hibernate.annotations.Comment;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "PAYMENTS")
@SequenceGenerator(name = "PAYMENTS_SEQ_GEN", sequenceName = "PAYMENTS_SEQ", initialValue = 1, allocationSize = 1)
public class Payments {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PAYMENTS_SEQ_GEN")
    @Comment("결제 번호")
    private Long payNo;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    @Comment("구독 회원 아이디")
    private Members member;

    @Column(nullable = false)
    @Comment("결제 금액")
    private Integer payAmount;

    @Column(nullable = false)
    @Comment("결제 일시")
    private Timestamp payDate;

}
