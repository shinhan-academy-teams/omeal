package com.shinhan.omeal.repository;

import com.shinhan.omeal.entity.Feedback;
import com.shinhan.omeal.entity.Members;
import com.shinhan.omeal.entity.Menu;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

public interface FeedbackRepository extends CrudRepository<Feedback, Long> {

    public Feedback findByMemberAndMenu(Members member, Menu menu);

    @Transactional
    public void deleteByMemberAndMenu(Members member, Menu menu);
}
