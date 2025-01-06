package com.nwb.NWB_Transaction_Service.service;

import com.nwb.NWB_Transaction_Service.client.ClearingHouseClient;
import com.nwb.NWB_Transaction_Service.constants.Constants;
import com.nwb.NWB_Transaction_Service.dto.AccountValidationResponse;
import com.nwb.NWB_Transaction_Service.dto.BalanceUpdateRequest;
import com.nwb.NWB_Transaction_Service.dto.TransactionRequest;
import com.nwb.NWB_Transaction_Service.entities.Transaction;
import com.nwb.NWB_Transaction_Service.enums.AccountStatus;
import com.nwb.NWB_Transaction_Service.exception.ResourceNotFoundException;
import com.nwb.NWB_Transaction_Service.exception.ValidationException;
import com.nwb.NWB_Transaction_Service.functions.BalanceUpdater;
import com.nwb.NWB_Transaction_Service.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {
    private final TransactionRepository transactionRepository;
    private final WebClient webClient;
    private final ClearingHouseClient clearingHouseClient;
    @Value("${bank.ifsc.code}")
    private String bankIFSCCode;

    @Autowired
    public TransactionServiceImpl(TransactionRepository transactionRepository, WebClient webClient, ClearingHouseClient clearingHouseClient) {
        this.transactionRepository = transactionRepository;
        this.webClient = webClient;
        this.clearingHouseClient = clearingHouseClient;
    }

    @Override
    public Integer processTransaction(TransactionRequest request){
        String fromIFSCCode = request.fromIFSCCode();
        String toIFSCCode = request.toIFSCCode();

        if (fromIFSCCode.equals(bankIFSCCode) && toIFSCCode.equals(bankIFSCCode)) {
            // Internal transaction within the same bank
            return processInternalTransaction(request);
        } else if (!fromIFSCCode.equals(bankIFSCCode)) {
            // Invalid transaction: fromIFSCCode should be the bank's IFSC code
            throw new ValidationException("Sending bank should be from the same bank.");
        } else if (!toIFSCCode.equals(bankIFSCCode)) {
            // External transaction to another bank
            return processOutgoingExternalTransaction(request);
        } else {
            // Invalid case
            throw new ValidationException("Invalid transaction request.");
        }
    }


    @Override
    public Integer processInternalTransaction(TransactionRequest request) {
        //validate fromAccount
        var fromAccountResponse = webClient.get()
                .uri(Constants.ACCOUNT_SERVICE_URL + "/accounts/validate/{accountNumber}", request.fromAccount())
                .retrieve()
                .onStatus(
                        HttpStatusCode::isError,
                        clientResponse -> clientResponse.bodyToMono(String.class)
                                .flatMap(errorBody -> {
                                    if (clientResponse.statusCode() == HttpStatus.NOT_FOUND) {
                                        return Mono.error(new ValidationException(Constants.FROM_ACCOUNT_INVALID));
                                    } else {
                                        return Mono.error(new ValidationException("Error validating fromAccount: " + errorBody));
                                    }
                                })
                )
                .bodyToMono(AccountValidationResponse.class)
                .block();


        //validate toAccount
        var toAccountResponse = webClient.get()
                .uri(Constants.ACCOUNT_SERVICE_URL + "/accounts/validate/{accountNumber}", request.toAccount())
                .retrieve()
                .onStatus(
                        HttpStatusCode::isError,
                        clientResponse -> clientResponse.bodyToMono(String.class)
                                .flatMap(errorBody -> {
                                    if (clientResponse.statusCode() == HttpStatus.NOT_FOUND) {
                                        return Mono.error(new ValidationException(Constants.TO_ACCOUNT_INVALID));
                                    } else {
                                        return Mono.error(new ValidationException("Error validating toAccount: " + errorBody));
                                    }
                                })
                )
                .bodyToMono(AccountValidationResponse.class)
                .block();

        //Check Account Statuses
        if(fromAccountResponse.status() != AccountStatus.ACTIVE){
            throw new ValidationException(Constants.FROM_ACCOUNT_INACTIVE);
        }

        if(toAccountResponse.status() != AccountStatus.ACTIVE){
            throw new ValidationException(Constants.TO_ACCOUNT_INACTIVE);
        }

        //Check Sufficient Balance
        if(fromAccountResponse.balance().compareTo(request.amount()) < 0){
            throw new ValidationException(Constants.INSUFFICIENT_BALANCE);
        }

        //Interfaces for balance update
        BalanceUpdater subtractor = BigDecimal::subtract;
        BalanceUpdater adder = BigDecimal::add;

        BigDecimal updatedFromBalance = subtractor.updateBalance(fromAccountResponse.balance(),request.amount());
        BigDecimal updatedToBalance = adder.updateBalance(toAccountResponse.balance(),request.amount());

        //Update changed balance to accounts
        webClient.post()
                .uri(Constants.ACCOUNT_SERVICE_URL+"/accounts/updateBalance")
                .bodyValue(new BalanceUpdateRequest(request.fromAccount(), updatedFromBalance))
                .retrieve()
                .bodyToMono(Void.class)
                .block();

        webClient.post()
                .uri(Constants.ACCOUNT_SERVICE_URL+"/accounts/updateBalance")
                .bodyValue(new BalanceUpdateRequest(request.toAccount(), updatedToBalance))
                .retrieve()
                .bodyToMono(Void.class)
                .block();

        var transaction = new Transaction(
                request.fromAccount(),
                request.toAccount(),
                request.amount()
        );

        var savedTransaction = transactionRepository.save(transaction);
        return savedTransaction.getId();
    }
    //------------------------------------------------------------------------------------------------------------------

    public Integer processOutgoingExternalTransaction(TransactionRequest request) {
        // Validate fromAccount
        var fromAccountResponse = webClient.get()
                .uri(Constants.ACCOUNT_SERVICE_URL + "/accounts/validate/{accountNumber}", request.fromAccount())
                .retrieve()
                .onStatus(
                        HttpStatusCode::isError,
                        clientResponse -> clientResponse.bodyToMono(String.class)
                                .flatMap(errorBody -> {
                                    if (clientResponse.statusCode() == HttpStatus.NOT_FOUND) {
                                        return Mono.error(new ValidationException(Constants.FROM_ACCOUNT_INVALID));
                                    } else {
                                        return Mono.error(new ValidationException("Error validating fromAccount: " + errorBody));
                                    }
                                })
                )
                .bodyToMono(AccountValidationResponse.class)
                .block();

        // Check Account Status
        if (fromAccountResponse.status() != AccountStatus.ACTIVE) {
            throw new ValidationException(Constants.FROM_ACCOUNT_INACTIVE);
        }

        // Check Sufficient Balance
        if (fromAccountResponse.balance().compareTo(request.amount()) < 0) {
            throw new ValidationException(Constants.INSUFFICIENT_BALANCE);
        }

        // Deduct amount from fromAccount
        BigDecimal updatedFromBalance = fromAccountResponse.balance().subtract(request.amount());

        // Update balance
        webClient.post()
                .uri(Constants.ACCOUNT_SERVICE_URL + "/accounts/updateBalance")
                .bodyValue(new BalanceUpdateRequest(request.fromAccount(), updatedFromBalance))
                .retrieve()
                .bodyToMono(Void.class)
                .block();

        // Send request to clearing house
        try {
            clearingHouseClient.sendTransaction(request);
        } catch (Exception e) {
            // Transaction failure, add amount back
            webClient.post()
                    .uri(Constants.ACCOUNT_SERVICE_URL + "/accounts/updateBalance")
                    .bodyValue(new BalanceUpdateRequest(request.fromAccount(), fromAccountResponse.balance()))
                    .retrieve()
                    .bodyToMono(Void.class)
                    .block();

            throw new ValidationException("Transaction failed: " + e.getMessage());
        }

        // Persist the transaction
        var transaction = new Transaction(
                request.fromAccount(),
                request.toAccount(),
                request.amount()
        );

        var savedTransaction = transactionRepository.save(transaction);
        return savedTransaction.getId();
    }

    //------------------------------------------------------------------------------------------------------------------

    public Integer processIncomingExternalTransaction(TransactionRequest request) {
        // Validate toAccount
        var toAccountResponse = webClient.get()
                .uri(Constants.ACCOUNT_SERVICE_URL + "/accounts/validate/{accountNumber}", request.toAccount())
                .retrieve()
                .onStatus(
                        HttpStatusCode::isError,
                        clientResponse -> clientResponse.bodyToMono(String.class)
                                .flatMap(errorBody -> {
                                    if (clientResponse.statusCode() == HttpStatus.NOT_FOUND) {
                                        return Mono.error(new ValidationException(Constants.TO_ACCOUNT_INVALID));
                                    } else {
                                        return Mono.error(new ValidationException("Error validating toAccount: " + errorBody));
                                    }
                                })
                )
                .bodyToMono(AccountValidationResponse.class)
                .block();

        // Check Account Status
        if (toAccountResponse.status() != AccountStatus.ACTIVE) {
            throw new ValidationException(Constants.TO_ACCOUNT_INACTIVE);
        }

        // Add amount to toAccount
        BigDecimal updatedToBalance = toAccountResponse.balance().add(request.amount());

        // Update balance
        webClient.post()
                .uri(Constants.ACCOUNT_SERVICE_URL + "/accounts/updateBalance")
                .bodyValue(new BalanceUpdateRequest(request.toAccount(), updatedToBalance))
                .retrieve()
                .bodyToMono(Void.class)
                .block();

        // Persist the transaction
        var transaction = new Transaction(
                request.fromAccount(),
                request.toAccount(),
                request.amount()
        );

        var savedTransaction = transactionRepository.save(transaction);
        return savedTransaction.getId();
    }

    //------------------------------------------------------------------------------------------------------------------
    @Override
    public Transaction getTransactionById(Integer Id){
        return transactionRepository.findById(Id)
                .orElseThrow(()->new ResourceNotFoundException(Constants.TRANSACTION_NOT_FOUND+Id));
    }

    @Override
    public List<Transaction> getTransactionsAboveAmount(BigDecimal amount){
        return transactionRepository.findByAmountGreaterThanEqual(amount);
    }

    @Override
    public List<Transaction> getTransactionsWithinDateRange(LocalDate startDate, LocalDate endDate){
        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.atTime(23, 59, 59);
        Instant T1 = startDateTime.toInstant(ZoneOffset.of("Asia/Kolkata"));
        Instant T2 = endDateTime.toInstant(ZoneOffset.of("Asia/Kolkata"));
        return transactionRepository.findByRecordTimeBetween( T1 ,T2);
    }

}
