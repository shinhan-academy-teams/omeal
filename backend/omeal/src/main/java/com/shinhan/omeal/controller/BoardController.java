package com.shinhan.omeal.controller;

import com.shinhan.omeal.dto.community.BoardCategory;
import com.shinhan.omeal.dto.community.BoardDTO;
import com.shinhan.omeal.dto.community.ContentsDTO;
import com.shinhan.omeal.dto.community.TownName;
import com.shinhan.omeal.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {
    private final BoardService boardService;

    // 글 게시
    @PostMapping("/register")
    public String boardRegister(@RequestBody BoardDTO dto) {
        return boardService.post(dto);
    }

    // 특정 글 보기
    @GetMapping("/content")
    public ResponseEntity<BoardDTO> getContent(Long postNo) {
        return ResponseEntity.ok(boardService.getContent(postNo));
    }

    // 특정 마을별 글 목록 조회
    @GetMapping("/{townname}")
    public List<ContentsDTO> getContentsList(@PathVariable TownName townname) {
         return boardService.getContentsTown(townname);
    }

    // 특정 마을의 제목으로 게시물 조회
    @GetMapping("/{townname}/title")
    public List<ContentsDTO> getTitleContentsList(@PathVariable TownName townname, String title) {
        return boardService.getTitleContentsList(townname, title);
    }

    // 특정 마을의 닉네임으로 게시물 조회
    @GetMapping("/{townname}/nick-name")
    public List<ContentsDTO> getNicknameContentsList(@PathVariable TownName townname, String nickname) {
        return boardService.getNicknameContentsList(townname, nickname);
    }

    // 마을의 내용으로 게시글 조회
    @GetMapping("/{townname}/content")
    public List<ContentsDTO> getPostContentsList(@PathVariable TownName townname, String content) {
        return boardService.getPostContentsList(townname, content);
    }

    // 특정 마을의 카테고리별 글 목록 조회
    @GetMapping("/{townname}/{category}")
    public List<ContentsDTO> getCategoryContentsList(@PathVariable TownName townname,@PathVariable BoardCategory category) {
        if(category==BoardCategory.인기글){
            return boardService.getBestContentsList(townname);
        }
        else{
            return boardService.getContentsCategory(townname,category);
        }
    }

    // 특정 마을의 카테고리별 제목으로 검색
    @GetMapping("/{townname}/{category}/title")
    public List<ContentsDTO> getCategoryContentsListTitle(@PathVariable TownName townname, @PathVariable BoardCategory category, String title) {
        if(category==BoardCategory.인기글){
            return boardService.getBestContentsListTitle(townname, title);
        }
        else{
            return boardService.getContentsCategoryTitle(townname, category, title);
        }
    }

    // 특정 마을의 카테고리별 닉네임으로 검색
    @GetMapping("/{townname}/{category}/nick-name")
    public List<ContentsDTO> getCategoryContentsListNickname(@PathVariable TownName townname, @PathVariable BoardCategory category, String nickname) {
        if(category==BoardCategory.인기글){
            return boardService.getBestContentsListNickname(townname, nickname);
        }
        else{
            return boardService.getContentsCategoryNickname(townname,category, nickname);
        }
    }

    // 특정 마을의 카테고리별 내용으로 검색
    @GetMapping("/{townname}/{category}/content")
    public List<ContentsDTO> getCategoryContentsListPost(@PathVariable TownName townname, @PathVariable BoardCategory category, String content) {
        if(category==BoardCategory.인기글){
            return boardService.getBestContentsListPost(townname, content);
        }
        else{
            return boardService.getContentsCategoryPost(townname,category, content);
        }
    }
}
