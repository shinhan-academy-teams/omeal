package com.shinhan.omeal.entity;

import javax.persistence.*;
import org.hibernate.annotations.Comment;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "COMMENTS")
public class Comments {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Comment("댓글 번호")
    private Long cmtNo;

    @ManyToOne
    @JoinColumn(name = "POST_NO")
    @Comment("게시글 번호")
    private Board post;

    @Column(nullable = false)
    @Comment("댓글 내용")
    private String content;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    @Comment("작성자 회원 아이디")
    private Members member;

    @CreationTimestamp
    @Comment("작성 일시")
    private Timestamp regDate;

}
