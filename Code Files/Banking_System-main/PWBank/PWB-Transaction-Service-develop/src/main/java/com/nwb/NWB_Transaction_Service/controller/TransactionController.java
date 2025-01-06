package com.nwb.NWB_Transaction_Service.controller;

import com.nwb.NWB_Transaction_Service.constants.Constants;
import com.nwb.NWB_Transaction_Service.entities.Transaction;
import com.nwb.NWB_Transaction_Service.exception.ValidationException;
import com.nwb.NWB_Transaction_Service.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import com.nwb.NWB_Transaction_Service.dto.TransactionResponse;
import com.nwb.NWB_Transaction_Service.dto.TransactionRequest;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
    private final TransactionService transactionService;
    @Value("${bank.ifsc.code}")
    private String bankIFSCCode;

    @Autowired
    public TransactionController(TransactionService transactionService){
        this.transactionService = transactionService;
    }

    @PostMapping
    public TransactionResponse createTransaction(@RequestBody TransactionRequest request) {
        String fromIFSCCode = request.fromIFSCCode();
        String toIFSCCode = request.toIFSCCode();

        if(fromIFSCCode.isEmpty() || !fromIFSCCode.equals(bankIFSCCode)){
            throw new ValidationException("Sending Bank should be same as the current Bank.");
        }
        Integer transactionId;
        if(toIFSCCode.equals(bankIFSCCode)){
            transactionId=transactionService.processTransaction(request);
            return new TransactionResponse("Transaction created successfully", transactionId);
        }else{
            transactionId=transactionService.processTransaction(request);
            return new TransactionResponse("External Transaction created successfully", transactionId);
        }

    }

    @PostMapping("/receiveExternal")
    public TransactionResponse receiveExternalTransaction(@RequestBody TransactionRequest request) {
        String toIFSCCode = request.toIFSCCode();

        if (!toIFSCCode.equals(bankIFSCCode)) {
            throw new ValidationException("Receiving bank should be our bank.");
        }

        Integer transactionId =  transactionService.processIncomingExternalTransaction(request);
        return new TransactionResponse("External Transaction Successful", transactionId);
    }

    @GetMapping("/{id}")
    public Transaction getTransactionById(@PathVariable Integer id) {
        return transactionService.getTransactionById(id);
    }

    @GetMapping("/amount/{amount}")
    public List<Transaction> getTransactionsAboveAmount(@PathVariable BigDecimal amount) {
        return transactionService.getTransactionsAboveAmount(amount);
    }

    @GetMapping("/dateRange")
    public List<Transaction> getTransactionsWithinDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return transactionService.getTransactionsWithinDateRange(startDate, endDate);
    }
}
