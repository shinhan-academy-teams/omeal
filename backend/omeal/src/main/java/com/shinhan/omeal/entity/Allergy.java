package com.shinhan.omeal.entity;

import org.hibernate.annotations.Comment;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ALLERGY")
public class Allergy {

    @Id
    @Comment("알레르기 코드")
    private Long allergyCode;

    @Comment("알레르기 유발 식품명")
    private String allergyFood;

}
