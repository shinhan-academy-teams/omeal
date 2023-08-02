package com.shinhan.omeal.repository;

import com.shinhan.omeal.entity.Members;
import com.shinhan.omeal.entity.Subscription;
import org.springframework.data.repository.CrudRepository;

public interface SubscriptionRepository extends CrudRepository<Subscription, String> {
    Subscription findByMember(Members mem);
}
