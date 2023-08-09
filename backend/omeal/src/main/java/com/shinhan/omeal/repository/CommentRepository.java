package com.shinhan.omeal.repository;

import com.shinhan.omeal.entity.Board;
import com.shinhan.omeal.entity.Comments;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends CrudRepository<Comments, Long> {
    List<Comments> findAllByPostOrderByRegDateDesc(Board board);
}
