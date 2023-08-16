package com.shinhan.omeal.repository;

import com.shinhan.omeal.dto.admin.FeedbackResultDTO;
import com.shinhan.omeal.entity.Feedback;
import com.shinhan.omeal.entity.Members;
import com.shinhan.omeal.entity.Menu;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FeedbackRepository extends CrudRepository<Feedback, Long> {

    public Feedback findByMemberAndMenu(Members member, Menu menu);

    // 싫어요
    @Query(value = "select new com.shinhan.omeal.dto.admin.FeedbackResultDTO(m.menuNo , m.menuName, count(*)) from Feedback f inner join f.menu m where f.feedback != 'like' GROUP BY m.menuNo order by count(*) desc")
    List<FeedbackResultDTO> getTop5FeedbackDislike(Pageable pageable);

    // 좋아요
    @Query(value = "select new com.shinhan.omeal.dto.admin.FeedbackResultDTO(m.menuNo , m.menuName, count(*)) from Feedback f inner join f.menu m where f.feedback = 'like' GROUP BY m.menuNo order by count(*) desc")
    List<FeedbackResultDTO> getTop5FeedbackLike(Pageable pageable);

}
