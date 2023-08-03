package com.shinhan.omeal.repository;

import com.shinhan.omeal.entity.Members;
import com.shinhan.omeal.entity.Subscription;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.shinhan.omeal.entity.Members;

public interface SubscriptionRepository extends CrudRepository<Subscription, Long> {

    public Subscription findByMember(Members memberId);

    @Query(value = "WITH continuous AS ( " +
            "SELECT sub_union_his.*, " +
            "LAG(start_date) OVER (ORDER BY start_date DESC) AS continuous_start_date, " +
            "TIMESTAMPDIFF(DAY, end_date, LAG(start_date) OVER (ORDER BY start_date DESC)) AS date_diff " +
            "FROM ( " +
            "(SELECT start_date, end_date, sub_type " +
            "FROM subscription " +
            "WHERE member_id = ?1) " +
            "UNION " +
            "(SELECT start_date, end_date, sub_type " +
            "FROM history " +
            "WHERE member_id = ?1) " +
            ") sub_union_his) " +
            "SELECT TIMESTAMPDIFF(DAY, IFNULL(MAX(continuous_start_date), (SELECT MIN(start_date) FROM continuous)), sysdate()) + 1 AS result " +
            "FROM continuous " +
            "WHERE date_diff > 1 ", nativeQuery = true)
    public int findContinuousDaysByMemberId(String memberId);
}
