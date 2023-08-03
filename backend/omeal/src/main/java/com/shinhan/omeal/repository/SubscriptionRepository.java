package com.shinhan.omeal.repository;

import com.shinhan.omeal.entity.Subscription;
import org.springframework.data.repository.CrudRepository;
import com.shinhan.omeal.entity.Members;

public interface SubscriptionRepository extends CrudRepository<Subscription,Long> {
    Subscription findByMember(Members mem);
}
