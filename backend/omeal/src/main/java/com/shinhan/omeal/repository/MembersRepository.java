package com.shinhan.omeal.repository;

import com.shinhan.omeal.entity.Members;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MembersRepository extends JpaRepository<Members, String> {

    Members findByMemberId(String memberId);
}
