package com.shinhan.omeal.repository;

import com.shinhan.omeal.dto.community.BoardCategory;
import com.shinhan.omeal.dto.community.TownName;
import com.shinhan.omeal.entity.Board;
import com.shinhan.omeal.entity.Members;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends CrudRepository<Board, Long> {
    List<Board> findAllByTownName(TownName townName);

    List<Board> findAllByTownNameAndCategory(TownName townName, BoardCategory category);

    List<Board> findTop10ByTownNameOrderByHitsDesc(TownName townName);

    List<Board> findAllByTownNameAndTitleContainingOrderByRegDateDesc(TownName townName, String title);

    List<Board> findAllByTownNameAndMemberOrderByRegDateDesc(TownName townName, Members members);

    List<Board> findAllByTownNameAndContentContainingOrderByRegDateDesc(TownName townName, String content);

    List<Board> findAllByTownNameAndCategoryAndTitleContainingOrderByRegDateDesc(TownName townName, BoardCategory category, String title);

    List<Board> findAllByTownNameAndCategoryAndMemberOrderByRegDateDesc(TownName townName, BoardCategory category, Members members);

    List<Board> findAllByTownNameAndCategoryAndContentContainingOrderByRegDateDesc(TownName townName, BoardCategory category, String content);

    List<Board> findTop10ByTownNameAndTitleContainingOrderByHitsDesc(TownName townName, String title);

    List<Board> findTop10ByTownNameAndMemberOrderByHitsDesc(TownName townNamem, Members members);

    List<Board> findTop10ByTownNameAndContentContainingOrderByHitsDesc(TownName townName, String content);

}
