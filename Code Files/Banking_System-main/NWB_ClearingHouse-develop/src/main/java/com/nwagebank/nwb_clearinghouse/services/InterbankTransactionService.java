package com.nwagebank.nwb_clearinghouse.services;

import com.nwagebank.nwb_clearinghouse.dto.InterbankTransactionResponse;
import com.nwagebank.nwb_clearinghouse.dto.TransactionRequest;

public interface InterbankTransactionService {
    InterbankTransactionResponse processTransaction(TransactionRequest request);
}
