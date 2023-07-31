package com.shinhan.omeal.entity;

import javax.persistence.*;

import com.shinhan.omeal.dto.community.BoardCategory;
import com.shinhan.omeal.dto.community.TownName;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "BOARD")
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Comment("게시글 번호")
    private Long postNo;

    @Column(nullable = false)
    @Comment("게시글 제목")
    private String title;

    @Column(nullable = false)
    @Comment("게시글 내용")
    private String content;

    @Comment("첨부사진")
    private String photo;

    @Enumerated(EnumType.STRING)
    @Comment("게시판 카테고리")
    private BoardCategory category = BoardCategory.자유게시판;

    @Enumerated(EnumType.STRING)
    @Comment("마을 분류")
    private TownName townName;

    @ColumnDefault("0")
    @Comment("조회수")
    private Integer hits;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    @Comment("작성자 회원 아이디")
    private Members member;

    @CreationTimestamp
    @Comment("작성 일시")
    private Timestamp regDate;

}
