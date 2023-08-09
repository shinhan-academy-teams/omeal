package com.shinhan.omeal.dto.todayMeal;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class FeedbackDTO { // from client
    private Long deliveryNo; // 배송 번호
    private String memberId; // 회원 아이디(이메일)
    private String menuName; // 배송 메뉴 이름
    private String feedback; // 피드백(싫어요, 좋아요)
}
