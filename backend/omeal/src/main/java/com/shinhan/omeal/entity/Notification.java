package com.shinhan.omeal.entity;

import org.hibernate.annotations.Comment;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "NOTIFICATION")
@SequenceGenerator(name = "NOTIFY_SEQ_GEN", sequenceName = "NOTIFY_SEQ", initialValue = 1, allocationSize = 1)

public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "NOTIFY_SEQ_GEN")
    @Comment("알림 번호")
    private Long notifyNo;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    @Comment("회원 아이디")
    private Members member;

    @Column(nullable = false)
    @Comment("알림 내용")
    private String content;

    @Column(nullable = false)
    @Comment("알림 일시")
    private Timestamp notifyDate;

}
