package com.shinhan.omeal.dto.community;

import com.shinhan.omeal.entity.Members;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
public class ContentsDTO {
    // 게시판 글 목록
    private Long postNo;
    private String title;
    private Integer hits;
    private BoardCategory category;
    private Members member;
    private Timestamp regDate;
}
