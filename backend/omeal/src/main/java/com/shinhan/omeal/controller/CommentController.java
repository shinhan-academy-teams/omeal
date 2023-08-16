package com.shinhan.omeal.controller;

import com.shinhan.omeal.dto.community.CommentDTO;
import com.shinhan.omeal.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reply")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping(value = "/register", consumes = "application/json")
    public String register(@RequestBody CommentDTO commentDTO) {
        return commentService.register(commentDTO);
    }

    @GetMapping("/inquiry")
    public List<CommentDTO> getComments(Long post_no) {
        return commentService.getComments(post_no);
    }

}
