package com.shinhan.omeal.repository;

import com.shinhan.omeal.dto.subscription.SubscriptionStatus;
import com.shinhan.omeal.entity.History;
import com.shinhan.omeal.entity.Members;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SubscriptionHistoryRepository extends CrudRepository<History, Long> {

    // 멤버별 결제내역
    List<History> findAllByMemberOrderByPayDateDesc(Members member);

    // 멤버 현재 구독중인 히스토리
    History findByMemberAndStatus(Members member, SubscriptionStatus status);

}
