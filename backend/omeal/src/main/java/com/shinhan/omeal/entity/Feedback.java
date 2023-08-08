package com.shinhan.omeal.entity;

import lombok.*;
import org.hibernate.annotations.Comment;

import javax.persistence.*;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "FEEDBACK")
@SequenceGenerator(name = "FEEDBACK_SEQ_GEN", sequenceName = "FEEDBACK_SEQ", initialValue = 1, allocationSize = 1)
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "FEEDBACK_SEQ_GEN")
    @Comment("피드백 번호")
    private Long feedbackNo;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    @Comment("피드백한 회원 아이디")
    private Members member;

    @ManyToOne
    @JoinColumn(name = "MENU_NO")
    @Comment("피드백한 메뉴")
    private Menu menu;


}
