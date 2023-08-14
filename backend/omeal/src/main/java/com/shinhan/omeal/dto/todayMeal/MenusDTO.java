package com.shinhan.omeal.dto.todayMeal;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class MenusDTO {
    private String menuName; // 배송 메뉴 이름
    private String feedback; // 피드백(싫어요, 좋아요)
    private String feedbackContent; // 피드백 기타 의견

    public MenusDTO(String menuName) {
        this.menuName = menuName;
    }
}
