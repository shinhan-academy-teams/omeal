package com.shinhan.omeal.service;

import com.shinhan.omeal.dto.community.CommentDTO;
import com.shinhan.omeal.entity.Board;
import com.shinhan.omeal.entity.Comments;
import com.shinhan.omeal.entity.Members;
import com.shinhan.omeal.repository.BoardRepository;
import com.shinhan.omeal.repository.CommentRepository;
import com.shinhan.omeal.repository.MembersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository cmtRepo;
    private final MembersRepository memRepo;
    private final BoardRepository boardRepo;

    // 댓글 작성
    public String register(CommentDTO commentDTO) {
        Members member = memRepo.findByMemberNick(commentDTO.getMemberNick());
        Board board = boardRepo.findById(commentDTO.getBoardNo()).orElse(null);
        if (member == null || board == null)
            return "Fail : No member or No board";

        Comments comments = Comments.toEntity(commentDTO, member, board);
        cmtRepo.save(comments);
        return "Success";
    }

    // 댓글 조회
    public List<CommentDTO> getComments(Long post_no) {
        try {
            Board board = boardRepo.findById(post_no).orElse(null);
            List<Comments> commentsList = cmtRepo.findAllByPostOrderByRegDateDesc(board);
            List<CommentDTO> dtoList = new LinkedList<>();
            for (Comments comments : commentsList) {
                CommentDTO dto = comments.toDTO();
                dto.setBoardNo(post_no);
                dtoList.add(dto);
            }

            return dtoList;

        } catch (Exception e) {
            return null;
        }
    }

}
