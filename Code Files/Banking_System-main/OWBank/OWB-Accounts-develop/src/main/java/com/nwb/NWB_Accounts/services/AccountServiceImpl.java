package com.nwb.NWB_Accounts.services;

import com.nwb.NWB_Accounts.dto.*;
import com.nwb.NWB_Accounts.entities.Account;
import com.nwb.NWB_Accounts.entities.Customer;
import com.nwb.NWB_Accounts.enums.AccountStatus;
import com.nwb.NWB_Accounts.exceptions.ResourceNotFoundException;
import com.nwb.NWB_Accounts.exceptions.ValidationException;
import com.nwb.NWB_Accounts.repositories.AccountRepository;
import com.nwb.NWB_Accounts.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;
    private final CustomerRepository customerRepository;

    @Autowired
    public AccountServiceImpl(AccountRepository accountRepository, CustomerRepository customerRepository) {
        this.accountRepository = accountRepository;
        this.customerRepository = customerRepository;
    }

    @Override
    public AccountDTO createAccount(CreateAccountRequest request) {
        // Check if account already exists
        accountRepository.findById(request.accountNumber())
                .ifPresent(a -> {
                    throw new ValidationException("Account already exists with account number: " + request.accountNumber());
                });

        // Create Customer entity
        var customer = new Customer(
                request.customer().firstName(),
                request.customer().lastName(),
                request.customer().ifscCode(),
                request.customer().address()
        );

        // Create Account entity
        var account = new Account(
                request.accountNumber(),
                request.initialBalance(),
                AccountStatus.ACTIVE,
                customer
        );

        // Save account
        accountRepository.save(account);

        // Return DTO
        return mapToAccountDTO(account);
    }

    @Override
    public void deleteAccount(String accountNumber) {
        var account = accountRepository.findById(accountNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with account number: " + accountNumber));

        // Set account status to CLOSED
        account.setStatus(AccountStatus.CLOSED);
        accountRepository.save(account);
    }

    @Override
    public AccountDTO getAccountByNumber(String accountNumber) {
        var account = accountRepository.findById(accountNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with account number: " + accountNumber));

        return mapToAccountDTO(account);
    }

    @Override
    public List<AccountDTO> getAllAccounts() {
        return accountRepository.findAll()
                .stream()
                .map(this::mapToAccountDTO)
                .collect(Collectors.toList());
    }

    @Override
    public AccountValidationResponse validateAccount(String accountNumber) {
        var account = accountRepository.findById(accountNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with account number: " + accountNumber));

        return new AccountValidationResponse(
                account.getAccountNumber(),
                account.getBalance(),
                account.getStatus()
        );
    }

    @Override
    public void updateAccountBalance(UpdateBalanceRequest request) {
        var account = accountRepository.findById(request.accountNumber())
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with account number: " + request.accountNumber()));

        account.setBalance(request.newBalance());
        accountRepository.save(account);
    }

    // Helper method to map Account entity to AccountDTO
    private AccountDTO mapToAccountDTO(Account account) {
        var customerDTO = new CustomerDTO(
                account.getCustomer().getFirstName(),
                account.getCustomer().getLastName(),
                account.getCustomer().getIfscCode(),
                account.getCustomer().getAddress()
        );

        return new AccountDTO(
                account.getAccountNumber(),
                account.getBalance(),
                account.getStatus(),
                customerDTO
        );

    }

}
