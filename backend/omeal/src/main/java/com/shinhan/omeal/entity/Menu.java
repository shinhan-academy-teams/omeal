package com.shinhan.omeal.entity;

import com.shinhan.omeal.dto.subscription.SubscriptionCategory;
import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.Comment;

import javax.persistence.*;

@Getter
@ToString
@Entity
@Table(name = "MENU")
@SequenceGenerator(name = "MENU_SEQ_GEN", sequenceName = "MENU_SEQ", initialValue = 1, allocationSize = 1)
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MENU_SEQ_GEN")
    @Comment("메뉴 구분 번호")
    private Long menuNo;

    @Enumerated(EnumType.STRING)
    @Comment("대분류 카테고리 - 성향")
    private SubscriptionCategory category;

    @Comment("세부 분류")
    private String subcategory;

    @Column(nullable = false)
    @Comment("메뉴 이름")
    private String menuName;

    @OneToOne
    @JoinColumn(name = "ALLERGY_CODE")
    @Comment("알레르기 유발 식품")
    private Allergy allergy;

    @Comment("원재료")
    private String ingredients;

}
