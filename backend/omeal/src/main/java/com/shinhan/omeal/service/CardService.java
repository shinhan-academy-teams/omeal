package com.shinhan.omeal.service;

import com.shinhan.omeal.dto.members.CardDTO;
import com.shinhan.omeal.entity.Card;
import com.shinhan.omeal.repository.MembersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CardService {
    private final MembersRepository memRepo;

    // 마이페이지 - 카드 정보 조회
    public CardDTO select(String memId){
        try {
            Card card = memRepo.findById(memId).orElse(null).getCard();
            return card.createDTO();
        }catch (Exception e) {
            e.printStackTrace();
            System.out.println("카드 정보 조회에서 오류 발생");
            return null;
        }
    }
}
