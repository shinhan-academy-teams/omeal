package com.shinhan.omeal.dto.community;

import com.shinhan.omeal.entity.Board;
import com.shinhan.omeal.entity.Members;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
public class CommentDTO {
    private Long cmtNo;
    private Long board_no;
    private String content;
    private String memberNick;
    private Timestamp regDate;
}
