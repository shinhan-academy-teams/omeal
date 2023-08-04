package com.shinhan.omeal.service;

import com.shinhan.omeal.dto.todayMeal.TodayMealDTO;
import com.shinhan.omeal.entity.Allergy;
import com.shinhan.omeal.entity.DeliveryHistory;
import com.shinhan.omeal.entity.Members;
import com.shinhan.omeal.entity.Menu;
import com.shinhan.omeal.repository.AllergyRepository;
import com.shinhan.omeal.repository.MembersRepository;
import com.shinhan.omeal.repository.MenuRepository;
import com.shinhan.omeal.repository.TodayMealRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TodayMealService {

    final TodayMealRepository tmRepo;
    final MembersRepository memRepo;
    final AllergyRepository allergyRepo;
    final MenuRepository menuRepo;

    // 하단의 '오늘의 밀' 아이콘 눌렀을 때 뜨는 첫 페이지
    public TodayMealDTO getDeliveryInfo(String memberId){
        // 그럴리 없겠지만 혹시나 memberId에 해당하는 Members 엔티티가 없다면 RuntimeException 으로 예외처리하게끔 설정 (체크 예외 말고)
        Members member = memRepo.findById(memberId).orElseThrow(()->new NoSuchElementException());

        // 배송내역 1건만 보여줘야 하므로
        List<DeliveryHistory> deliveryHistoryList = tmRepo.findByMemberOrderByDeliveryNoDesc(member);
        DeliveryHistory deliveryHistory = deliveryHistoryList.get(0);
        
        return TodayMealDTO.toTodayMealDTO(deliveryHistory);
    }

    // 랜덤 메뉴 얻기 (without 알러지)
    public String getRandomMenu(){ // 나중에 매개변수에 회원 ID ㄱㄱ
        String memberId = "test1@mail.com";

        Members member = memRepo.findById(memberId).get();
        List<Allergy> memberAllergyList =  member.getMemberAllergy();

        // 알러지 코드에 해당하지 않는 메뉴 얻기
        return getMenuWithoutAllergy(memberAllergyList);
    }

    public List<Long> getAllergyCodeList(List<Allergy> memberAllergyList){
        List<Long> allergyCodeList = new ArrayList<>();
        for(int i=0; i<memberAllergyList.size(); i++){
            Long allergyCode = memberAllergyList.get(i).getAllergyCode();
            allergyCodeList.add(allergyCode);
        }
        return allergyCodeList;
    }

    public String getMenuWithoutAllergy(List<Allergy> memberAllergyList){
        // 알러지 코드에 해당하지 않는 메뉴 얻기
        Set<Menu> menuSet = menuRepo.findByAllergyNotIn(memberAllergyList);
        long size = menuSet.size();
        int random = (int)(Math.random() * size);

        // 중복 제거한 menuSet으로 menuList 만들기 (for 랜덤 뽑기)
        List<Menu> menuList = new ArrayList<>(menuSet);

        String menuName = menuList.get(random).getMenuName();
        System.out.println(menuName);

        return menuName;
    }
}
