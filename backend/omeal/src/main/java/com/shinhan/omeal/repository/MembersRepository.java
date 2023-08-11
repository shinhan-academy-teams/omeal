package com.shinhan.omeal.repository;

import com.shinhan.omeal.entity.Members;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MembersRepository extends CrudRepository<Members, String> {

    Members findByMemberNick(String memberNick);

    List<Members> findAllByMemberNickContaining(String memberNick);
    List<Members> findAll();
}
