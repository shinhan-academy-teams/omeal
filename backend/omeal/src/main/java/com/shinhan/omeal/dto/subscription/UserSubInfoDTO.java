package com.shinhan.omeal.dto.subscription;

import lombok.Getter;
import lombok.Setter;
import lombok.Builder;

import java.util.List;

@Getter
@Setter
public class UserSubInfoDTO {
    // 마이페이지 구독 정보 응답 DTO

    private String subType;                 // 구독타입
    private String category;                // 성향
    private String container;               // 용기
    private List<String> memberAllergy;    //알러지

    @Builder
    public UserSubInfoDTO(List<String> sub, List<String> memberAllergy){
        this.subType=sub.get(0);
        this.category=sub.get(1);
        this.container=sub.get(2);
        this.memberAllergy=memberAllergy;
    }

}