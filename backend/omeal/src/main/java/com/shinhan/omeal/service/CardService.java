package com.shinhan.omeal.service;

import com.shinhan.omeal.dto.members.CardDTO;
import com.shinhan.omeal.entity.Card;
import com.shinhan.omeal.repository.MembersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CardService {
    private final MembersRepository memRepo;

    // 마이페이지 - 카드 정보 조회
    public CardDTO select(String memId) {
        try {
            Card card = Objects.requireNonNull(memRepo.findById(memId).orElse(null)).getCard();
            return card.createDTO();
        } catch (Exception e) {
            return null;
        }
    }

    // 마이페이지 - 카드 정보 수정
    @Transactional
    public String update(CardDTO dto, String memId) {
        try {
            Card card = Objects.requireNonNull(memRepo.findById(memId).orElse(null)).getCard();
            card.updateCardInfo(dto);
            return "updateSuccess";
        } catch (Exception e) {
            return "updateFail";
        }
    }

}
