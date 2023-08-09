package com.shinhan.omeal.dto.community;

import com.shinhan.omeal.entity.Members;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;
import java.sql.Timestamp;

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
}
