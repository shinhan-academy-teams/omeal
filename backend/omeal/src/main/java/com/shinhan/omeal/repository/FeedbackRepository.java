package com.shinhan.omeal.repository;

import com.shinhan.omeal.entity.Feedback;
import com.shinhan.omeal.entity.Members;
import com.shinhan.omeal.entity.Menu;
import org.springframework.data.repository.CrudRepository;

public interface FeedbackRepository extends CrudRepository<Feedback, Long> {

    public Feedback findByMemberAndMenu(Members member, Menu menu);

}
