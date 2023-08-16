package com.shinhan.omeal.repository;

import com.shinhan.omeal.dto.admin.PaymentResultDTO;
import com.shinhan.omeal.entity.History;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends CrudRepository<History, Long> {
    // 월별 MONTHLY 매출
    @Query(value = "select new com.shinhan.omeal.dto.admin.PaymentResultDTO( date_format(h.payDate, '%Y-%m'), h.subType, SUM(h.amount)) from History h where h.subType='MONTHLY' and date_format(h.payDate, '%Y') = :year group by date_format(h.payDate, '%Y-%m') order by date_format(h.payDate, '%Y-%m')")
    List<PaymentResultDTO> getMonthlyPaymentResult(String year);


    // 주별 WEEKLY 매출
    @Query(value = "select new com.shinhan.omeal.dto.admin.PaymentResultDTO( date_format(h.payDate, '%U'), h.subType, SUM(h.amount)) from History h where h.subType='WEEKLY' and date_format(h.payDate, '%Y') = :year group by date_format(h.payDate, '%U') order by date_format(h.payDate, '%U')")
    List<PaymentResultDTO> getWeeklyPaymentResult(String year);
}
