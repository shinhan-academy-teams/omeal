package com.shinhan.omeal.repository;

import com.shinhan.omeal.dto.subscription.SubscriptionCategory;
import com.shinhan.omeal.entity.Allergy;
import com.shinhan.omeal.entity.Menu;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Set;

public interface MenuRepository extends CrudRepository<Menu, Long> {

    Set<Menu> findByAllergyIn(List<Allergy> allergyList);

    // 구독 카테고리별 메뉴
    Set<Menu> findByCategory(SubscriptionCategory category);

    Set<Menu> findBySubcategory(String subCategory);

    List<Menu> findByMenuName(String menuName);

}
