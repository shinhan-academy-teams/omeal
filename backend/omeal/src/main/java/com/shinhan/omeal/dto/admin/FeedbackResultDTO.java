package com.shinhan.omeal.dto.admin;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class FeedbackResultDTO {
    private String menuName; // 배송 메뉴 이름
    private Long count; // 싫어요 수
}
