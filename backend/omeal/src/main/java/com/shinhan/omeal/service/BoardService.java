package com.shinhan.omeal.service;

import com.shinhan.omeal.dto.community.*;
import com.shinhan.omeal.entity.Board;
import com.shinhan.omeal.entity.Comments;
import com.shinhan.omeal.entity.Members;
import com.shinhan.omeal.repository.BoardRepository;
import com.shinhan.omeal.repository.MembersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final MembersRepository memRepo;
    private final BoardRepository boardRepo;
    private final CommentService commentService;


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
        List<CommentDTO> commentsList = commentService.getComments(postNo);
        return BoardDTO.toBoardDTO(board, commentsList);
    }

    // 특정 마을 글 목록 요청
    @Transactional
    public List<ContentsDTO> getContentsTown(TownName townName) {
        List<Board> boardlist = boardRepo.findAllByTownName(townName);
        List<ContentsDTO> contentlist = boardlist.stream().map(board -> board.toContentsDTO()).collect(Collectors.toList());
        return contentlist;
    }

    // 마을의 제목으로 게시글 조회
    @Transactional
    public List<ContentsDTO> getTitleContentsList(TownName townname, String title) {
        List<Board> boardList = boardRepo.findAllByTownNameAndTitleContainingOrderByRegDateDesc(townname, title);
        List<ContentsDTO> dto = boardList.stream().map(b->b.toContentsDTO()).collect(Collectors.toList());
        return dto;
    }

    // 마을의 닉네임으로 게시글 조회
    @Transactional
    public List<ContentsDTO> getNicknameContentsList(TownName townName, String nickname) {
        List<Members> memlist = memRepo.findAllByMemberNickContaining(nickname);
        System.out.println(memlist);
        if(memlist.isEmpty())
            return null;

        List<ContentsDTO> dto = new LinkedList();
        for(Members mem : memlist){
            List<Board> boardList = boardRepo.findAllByTownNameAndMemberOrderByRegDateDesc(townName, mem);
            dto.addAll(boardList.stream().map(b->b.toContentsDTO()).collect(Collectors.toList()));
        }

        return dto;
    }

    // 마을의 내용으로 게시글 조회
    @Transactional
    public List<ContentsDTO> getPostContentsList(TownName townName, String content) {
        List<Board> boardList = boardRepo.findAllByTownNameAndContentContainingOrderByRegDateDesc(townName, content);
        List<ContentsDTO> dto = boardList.stream().map(b->b.toContentsDTO()).collect(Collectors.toList());
        return dto;
    }

    // 특정 마을의 카테고리 글 목록 요청
    @Transactional
    public List<ContentsDTO> getContentsCategory(TownName townName, BoardCategory category) {
        List<Board> boardlist = boardRepo.findAllByTownNameAndCategory(townName, category);
        List<ContentsDTO> contentlist = boardlist.stream().map(board -> board.toContentsDTO()).collect(Collectors.toList());
        return contentlist;
    }

    // 마을의 인기글 조회
    @Transactional
    public List<ContentsDTO> getBestContentsList(TownName townname) {
        List<Board> boardList =boardRepo.findTop10ByTownNameOrderByHitsDesc(townname);
        List<ContentsDTO> dto = boardList.stream().map(board -> board.toContentsDTO()).collect(Collectors.toList());
        return dto;
    }

    // 특정 마을의 카테고리에 제목으로 조회
    @Transactional
    public List<ContentsDTO> getContentsCategoryTitle(TownName townName, BoardCategory category, String title) {
        List<Board> boardlist = boardRepo.findAllByTownNameAndCategoryAndTitleContainingOrderByRegDateDesc(townName, category, title);
        List<ContentsDTO> contentlist = boardlist.stream().map(board -> board.toContentsDTO()).collect(Collectors.toList());
        return contentlist;
    }

    // 특정 마을의 인기글에 제목으로 조회
    @Transactional
    public List<ContentsDTO> getBestContentsListTitle(TownName townname, String title) {
        List<Board> boardList =boardRepo.findTop10ByTownNameAndTitleContainingOrderByHitsDesc(townname, title);
        List<ContentsDTO> dto = boardList.stream().map(board -> board.toContentsDTO()).collect(Collectors.toList());
        return dto;
    }

    // 특정 마을의 카테고리에 닉네임으로 조회
    @Transactional
    public List<ContentsDTO> getContentsCategoryNickname(TownName townName, BoardCategory category, String nickname) {
        List<Members> memlist = memRepo.findAllByMemberNickContaining(nickname);
        System.out.println(memlist);
        if(memlist.isEmpty())
            return null;

        List<ContentsDTO> dto = new LinkedList();
        for(Members mem : memlist){
            List<Board> boardList = boardRepo.findAllByTownNameAndCategoryAndMemberOrderByRegDateDesc(townName, category, mem);
            dto.addAll(boardList.stream().map(b->b.toContentsDTO()).collect(Collectors.toList()));
        }

        return dto;
    }

    // 특정 마을의 인기글에 닉네임으로 조회
    @Transactional
    public List<ContentsDTO> getBestContentsListNickname(TownName townname, String nickname) {
        List<Members> memlist = memRepo.findAllByMemberNickContaining(nickname);
        System.out.println(memlist);
        if(memlist.isEmpty())
            return null;

        List<ContentsDTO> dto = new LinkedList();
        for(Members mem : memlist){
            List<Board> boardList = boardRepo.findTop10ByTownNameAndMemberOrderByHitsDesc(townname, mem);
            dto.addAll(boardList.stream().map(b->b.toContentsDTO()).collect(Collectors.toList()));
        }

        return dto;
    }

    // 특정 마을의 카테고리에 내용으로 조회
    @Transactional
    public List<ContentsDTO> getContentsCategoryPost(TownName townName, BoardCategory category, String content) {
        List<Board> boardlist = boardRepo.findAllByTownNameAndCategoryAndContentContainingOrderByRegDateDesc(townName, category, content);
        List<ContentsDTO> contentlist = boardlist.stream().map(board -> board.toContentsDTO()).collect(Collectors.toList());
        return contentlist;
    }

    // 특정 마을의 인기글에 내용으로 조회
    @Transactional
    public List<ContentsDTO> getBestContentsListPost(TownName townname, String content) {
        List<Board> boardList =boardRepo.findTop10ByTownNameAndContentContainingOrderByHitsDesc(townname, content);
        List<ContentsDTO> dto = boardList.stream().map(board -> board.toContentsDTO()).collect(Collectors.toList());
        return dto;
    }


}
