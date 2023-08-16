package com.shinhan.omeal.dto.todayMeal;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class FeedbackDTO {
    private String memberId; // 회원 아이디(이메일)
    private MenusDTO[] menus; // 메뉴
}
