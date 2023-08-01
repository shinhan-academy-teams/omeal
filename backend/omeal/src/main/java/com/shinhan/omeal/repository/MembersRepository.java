package com.shinhan.omeal.repository;

import com.shinhan.omeal.dto.members.MyPageUserInfoDTO;
import com.shinhan.omeal.entity.Members;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MembersRepository extends CrudRepository<Members, String> {

    MyPageUserInfoDTO findByMemberId(String memberId);
}
