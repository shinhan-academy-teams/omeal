package com.shinhan.omeal.dto.community;

import com.shinhan.omeal.entity.Board;
import com.shinhan.omeal.entity.Members;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@Builder
public class BoardDTO {
    private Long postNo;
    private String title;
    private String content;
    private String photo;
    private BoardCategory category;
    private TownName townName;
    private Integer hits;
    private Members member;
    private Timestamp regDate;
    private List<CommentDTO> commentsList;

    public static BoardDTO toBoardDTO(Board board, List<CommentDTO> commentsList) {
        return BoardDTO.builder()
                .postNo(board.getPostNo())
                .title(board.getTitle())
                .content(board.getContent())
                .photo(board.getPhoto())
                .commentsList(commentsList)
                .build();
    }
}
