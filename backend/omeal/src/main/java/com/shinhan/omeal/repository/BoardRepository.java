package com.shinhan.omeal.repository;

import com.shinhan.omeal.dto.community.TownName;
import com.shinhan.omeal.entity.Board;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends CrudRepository<Board, Long> {
    List<Board> findAllByTownName(TownName townName);
}
