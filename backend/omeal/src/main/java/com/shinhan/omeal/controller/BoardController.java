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
        System.out.println("___________________________"+dto);
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

    // 마을 + 카테고리 + 검색어
    @GetMapping("/{townname}/{category}")
    public List<ContentsDTO> getCategoryContentsList(@PathVariable TownName townname, @PathVariable String category, String topic){
        switch (category) {
            case "title":
                return boardService.getTitleContentsList(townname, topic);
            case "content":
                return boardService.getPostContentsList(townname, topic);
            case "nick-name":
                return boardService.getNicknameContentsList(townname, topic);
            default:
                return null;
        }
    }

    // 특정 마을의 옵션별 글 목록 조회
    @GetMapping("/{townname}/{option}/10")
    public List<ContentsDTO> getCategoryContentsList(@PathVariable TownName townname,@PathVariable BoardCategory option) {
        if(option==BoardCategory.인기글){
            return boardService.getBestContentsList(townname);
        }
        else{
            return boardService.getContentsCategory(townname, option);
        }
    }

    //게시글 내용
    @GetMapping("/{townname}/detail/{no}")
    public BoardDTO getBoardDetail(@PathVariable Long no) {

        return boardService.getBoardDetail(no);
    }

    // 마을 + 옵션 + 카테고리 + 검색어
    @GetMapping("/{townname}/{option}/{category}")
    public List<ContentsDTO> getOptionContentsList(@PathVariable TownName townname, @PathVariable BoardCategory option, @PathVariable String category, String topic) {

        switch (category){
            case "title":
                // 특정 마을의 카테고리별 제목으로 검색
                if(option==BoardCategory.인기글){
                    return boardService.getBestContentsListTitle(townname, topic);
                }
                else{
                    return boardService.getContentsCategoryTitle(townname, option, topic);
                }
            case "content":
                // 특정 마을의 카테고리별 내용으로 검색
                if(option==BoardCategory.인기글){
                    return boardService.getBestContentsListPost(townname, topic);
                }
                else{
                    return boardService.getContentsCategoryPost(townname, option, topic);
                }
            case "nick-name":
                // 특정 마을의 카테고리별 닉네임으로 검색
                if(option==BoardCategory.인기글){
                    return boardService.getBestContentsListNickname(townname, topic);
                }
                else{
                    return boardService.getContentsCategoryNickname(townname, option, topic);
                }
            default:
                System.out.println(" 잘 못된 경로 ");
                return null;
        }
    }


}
