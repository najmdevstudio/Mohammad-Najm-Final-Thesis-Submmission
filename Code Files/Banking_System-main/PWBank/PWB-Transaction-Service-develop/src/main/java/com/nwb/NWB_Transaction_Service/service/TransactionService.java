package com.nwb.NWB_Transaction_Service.service;

import com.nwb.NWB_Transaction_Service.dto.TransactionRequest;
import com.nwb.NWB_Transaction_Service.entities.Transaction;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface TransactionService {
    Integer processInternalTransaction(TransactionRequest request);
    Integer processTransaction(TransactionRequest request);
    Integer processOutgoingExternalTransaction(TransactionRequest request);
    Integer processIncomingExternalTransaction(TransactionRequest request);
    Transaction getTransactionById(Integer id);
    List<Transaction> getTransactionsAboveAmount(BigDecimal amount);
    List<Transaction> getTransactionsWithinDateRange(LocalDate startDate, LocalDate endDate);
}
