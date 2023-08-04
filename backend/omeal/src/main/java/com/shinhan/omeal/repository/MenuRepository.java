package com.shinhan.omeal.repository;

import com.shinhan.omeal.entity.Allergy;
import com.shinhan.omeal.entity.Menu;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Set;

public interface MenuRepository extends CrudRepository<Menu, Long> {

    // 알러지 제외한 메뉴 리스트 얻기
    // findByAgeNotIn(Collection<Age> ages) 형태 이용함
    // ★중복된 메뉴이름이 많고, 여러 건이 나와서 List가 아니라 Set으로 담음.
    Set<Menu> findByAllergyNotIn(List<Allergy> allergyList); // 참조 : https://docs.spring.io/spring-data/jpa/docs/2.5.1/reference/html/#jpa.query-methods
}
