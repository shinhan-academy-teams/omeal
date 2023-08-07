package com.shinhan.omeal;

import com.shinhan.omeal.dto.todayMeal.FeedbackDTO;
import com.shinhan.omeal.entity.Feedback;
import com.shinhan.omeal.entity.Members;
import com.shinhan.omeal.entity.Menu;
import com.shinhan.omeal.entity.Subscription;
import com.shinhan.omeal.repository.FeedbackRepository;
import com.shinhan.omeal.repository.MembersRepository;
import com.shinhan.omeal.repository.MenuRepository;
import com.shinhan.omeal.repository.SubscriptionRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
public class KyungYunTest {

    @Autowired
    MembersRepository memRepo;
    @Autowired
    SubscriptionRepository subRepo;
    @Autowired
    MenuRepository menuRepo;
    @Autowired
    FeedbackRepository fbRepo;

    // 피드백 남기기
//    @Test
    @Transactional
    void submitFeedback() {
        FeedbackDTO dto = new FeedbackDTO("test41@mail.com", "감자샐러드샌드위치", "like");

        Members member = memRepo.findById(dto.getMemberId()).orElse(null);
        List<Menu> menuIdList = menuRepo.findByMenuName(dto.getMenuName());
        for (Menu menu : menuIdList) {
            Feedback feedback = Feedback.builder()
                    .member(member)
                    .menu(menu)
                    .build();

            System.out.println(feedback);

            fbRepo.save(feedback);
        }
    }

    // 회원의 연속 기간 가져오기
//    @Test
    void getContinuousDays() {
        String input = "test5@mail.com";

        Members member = memRepo.findById(input).orElse(null);
        Subscription sub = subRepo.findByMember(member);
        if (sub == null) {
            System.out.println(input + " : 구독하지 않은 회원임.");
        } else {
            int days = subRepo.findContinuousDaysByMemberId(input);
            System.out.println("memberId: "+input+", 연속 구독 기간(일): "+days);
        }
    }

    // 닉네임 중복 체크
//    @Test
    void nickDup() {
        String input = "노찌롱";

        Members member = memRepo.findByMemberNick(input);
        if(member == null) {
            System.out.println("닉네임 중복 아님. 아이디 사용 가능.");
        } else {
            System.out.println("닉네임 중복. " + member);
        }
    }

    // 아이디 중복 체크
//    @Test
    void idDup() {
        String input = "kky417@kakao.com";

        Members member = memRepo.findById(input).orElse(null);
        if(member == null) {
            System.out.println("아이디 중복 아님. 아이디 사용 가능.");
        } else {
            System.out.println("아이디 중복. " + member);
        }
    }

    // 회원가입. 카드 번호, 알러지 정보 제외.
//    @Test
    void signUp() {
//        Members member = Members.builder()
//                .memberId("kky417@kakao.com")
//                .memberPwd("1234")
//                .memberName("김경윤")
//                .memberNick("티모준위")
//                .memberTel("01038129323")
//                .memberAddr("고양시 화신로 233")
//                .build();

        Members member = Members.builder()
                .memberId("test1@mail.com")
                .memberPwd("1234")
                .memberName("노홍철")
                .memberNick("노찌롱")
                .memberTel("01011112222")
                .memberAddr("지구 어딘가")
                .build();

        memRepo.save(member);
    }
}
