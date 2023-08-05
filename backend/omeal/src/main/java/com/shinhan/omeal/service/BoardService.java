package com.shinhan.omeal.service;

import com.shinhan.omeal.dto.community.BoardCategory;
import com.shinhan.omeal.dto.community.BoardDTO;
import com.shinhan.omeal.dto.community.ContentsDTO;
import com.shinhan.omeal.dto.community.TownName;
import com.shinhan.omeal.entity.Board;
import com.shinhan.omeal.entity.Members;
import com.shinhan.omeal.repository.BoardRepository;
import com.shinhan.omeal.repository.MembersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final MembersRepository memRepo;
    private final BoardRepository boardRepo;

    // 게시판 글 게시
    @Transactional
    public String post(BoardDTO dto) {
        try {
            Members member = memRepo.findById(dto.getMember().getMemberId()).get();
            dto.setMember(member);
            Board board = Board.toEntity(dto);
            boardRepo.save(board);
            return "postSuccess";
        }catch (Exception e) {
            e.printStackTrace();
            return "postFail";
        }
    }

    // 특정 게시글 요청
    @Transactional
    public BoardDTO getContent(Long postNo) {
        Board board = boardRepo.findById(postNo).get();
        board.updateHits();     // 조회 했으니 조회수 증가
        BoardDTO dto = board.toBoardDTO();
        return dto;
    }

    // 특정 마을 글 목록 요청
    @Transactional
    public List<ContentsDTO> getContentsTown(TownName townName) {
        List<Board> boardlist = boardRepo.findAllByTownName(townName);
        List<ContentsDTO> contentlist = boardlist.stream().map(board -> board.toContentsDTO()).collect(Collectors.toList());
        return contentlist;
    }

    // 특정 마을의 카테고리 글 목록 요청
    @Transactional
    public List<ContentsDTO> getContentsCategory(TownName townName, BoardCategory category) {
        List<Board> boardlist = boardRepo.findAllByTownNameAndCategory(townName, category);
        List<ContentsDTO> contentlist = boardlist.stream().map(board -> board.toContentsDTO()).collect(Collectors.toList());
        return contentlist;
    }

}
