package com.shinhan.omeal.entity;

import javax.persistence.*;

import com.shinhan.omeal.dto.community.BoardDTO;
import com.shinhan.omeal.dto.community.CommentDTO;
import com.shinhan.omeal.dto.members.MembersDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
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

    // 댓글 게시 : dto -> Entity 변경
    public static Comments toEntity(CommentDTO dto, Members member, Board board){
        Comments comment = Comments.builder()
                .post(board)
                .content(dto.getContent())
                .member(member)
                .build();

        return comment;
    }

    // 게시글을 조회해서 Entity -> DTO 로 변경
    public CommentDTO toDTO(){
        CommentDTO dto = CommentDTO.builder()
                .cmtNo(this.cmtNo)
                .content(this.content)
                .regDate(this.regDate)
                .memberNick(this.member.getMemberNick())
                .build();

        return dto;
    }

}
