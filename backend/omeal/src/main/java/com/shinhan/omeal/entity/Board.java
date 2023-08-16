package com.shinhan.omeal.entity;

import com.shinhan.omeal.dto.community.BoardCategory;
import com.shinhan.omeal.dto.community.BoardDTO;
import com.shinhan.omeal.dto.community.ContentsDTO;
import com.shinhan.omeal.dto.community.TownName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "BOARD")
@DynamicInsert
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

    @Comment("첨부 사진")
    private String photo;

    @Enumerated(EnumType.STRING)
    @Comment("게시판 카테고리")
    private BoardCategory category;

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

    // 게시글 게시 : dto -> Entity 변경
    public static Board toEntity(BoardDTO dto) {
        return Board.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .photo(dto.getPhoto())
                .category(dto.getCategory())
                .townName(dto.getTownName())
                .member(dto.getMember())
                .hits(dto.getHits())
                .build();
    }

    // 게시글을 조회해서 Entity -> DTO 로 변경
    public BoardDTO toBoardDTO() {
        return BoardDTO.builder()
                .postNo(this.postNo)
                .hits(this.hits)
                .title(this.title)
                .content(this.content)
                .photo(this.photo)
                .category(this.category)
                .townName(this.townName)
                .member(this.member)
                .regDate(this.regDate)
                .build();
    }

    // 조회수 증가
    public void updateHits() {
        this.hits += 1;
    }

    // 게시글을 조회해서 Entity -> DTO 로 변경
    public ContentsDTO toContentsDTO() {
        return ContentsDTO.builder()
                .postNo(this.postNo)
                .hits(this.hits)
                .title(this.title)
                .category(this.category)
                .member(this.member)
                .regDate(this.regDate)
                .build();
    }

}
