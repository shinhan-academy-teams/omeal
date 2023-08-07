package com.shinhan.omeal.entity;

import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.Comment;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@ToString
@Getter // 알러지 코드가 필요해서 Getter 위치 옮김
@Entity
@Table(name = "ALLERGY")
public class Allergy {

    @Id
    @Comment("알레르기 코드")
    private Long allergyCode;

    @Comment("알레르기 유발 식품명")
    //@Getter
    private String allergyFood;

}
