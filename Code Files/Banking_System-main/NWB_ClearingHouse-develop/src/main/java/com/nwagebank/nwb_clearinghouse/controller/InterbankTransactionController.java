package com.nwagebank.nwb_clearinghouse.controller;

import com.nwagebank.nwb_clearinghouse.dto.InterbankTransactionResponse;
import com.nwagebank.nwb_clearinghouse.dto.TransactionRequest;
import com.nwagebank.nwb_clearinghouse.services.InterbankTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.logging.Logger;

@RestController
@RequestMapping("/interbankTransactions")

public class InterbankTransactionController {
    private final InterbankTransactionService interbankTransactionService;
    private Logger logger = Logger.getLogger(InterbankTransactionController.class.getName());

    @Autowired
    public InterbankTransactionController(InterbankTransactionService interbankTransactionService) {
        this.interbankTransactionService = interbankTransactionService;
    }

    @PostMapping
    public ResponseEntity<InterbankTransactionResponse> processInterbankTransaction(@RequestBody TransactionRequest request){
        InterbankTransactionResponse response = interbankTransactionService.processTransaction(request);
        return ResponseEntity.ok(response);
    }
}
