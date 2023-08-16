package com.shinhan.omeal.repository;

import com.shinhan.omeal.entity.Allergy;
import org.springframework.data.repository.CrudRepository;

public interface AllergyRepository extends CrudRepository<Allergy, Long> {

    // 알레르기 식품명으로 해당되는 알레르기 찾기
    Allergy findByAllergyFood(String foodName);
}
