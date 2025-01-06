package com.nwb.NWB_Transaction_Service.repositories;

import com.nwb.NWB_Transaction_Service.entities.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    List<Transaction> findByAmountGreaterThanEqual(BigDecimal amount);
    List<Transaction> findByRecordTimeBetween(Instant recordTime, Instant recordTime2);
}
