package com.shinhan.omeal.repository;

import com.shinhan.omeal.entity.DeliveryHistory;
import com.shinhan.omeal.entity.History;
import com.shinhan.omeal.entity.Members;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SubscriptionHistoryRepository extends CrudRepository<History,Long> {

    // 멤버별 결제내역
    List<History> findAllByMemberOrderByPayDateDesc(Members member);

}
