package com.nwb.NWB_Accounts.controller;

import com.nwb.NWB_Accounts.dto.AccountDTO;
import com.nwb.NWB_Accounts.dto.AccountValidationResponse;
import com.nwb.NWB_Accounts.dto.CreateAccountRequest;
import com.nwb.NWB_Accounts.dto.UpdateBalanceRequest;
import com.nwb.NWB_Accounts.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accounts")
public class AccountController {
    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService){
        this.accountService = accountService;
    }

    @PostMapping
    public AccountDTO createAccount(@RequestBody CreateAccountRequest request) {
        return accountService.createAccount(request);
    }

    @DeleteMapping("/{accountNumber}")
    public String deleteAccount(@PathVariable String accountNumber) {
        accountService.deleteAccount(accountNumber);
        return "Account deleted successfully";
    }

    @GetMapping("/{accountNumber}")
    public AccountDTO getAccountByNumber(@PathVariable String accountNumber) {
        return accountService.getAccountByNumber(accountNumber);
    }

    @GetMapping
    public List<AccountDTO> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    // Endpoint for account validation (used by Transaction Service)
    @GetMapping("/validate/{accountNumber}")
    public AccountValidationResponse validateAccount(@PathVariable String accountNumber) {
        return accountService.validateAccount(accountNumber);
    }

    // Endpoint for updating balance (used by Transaction Service)
    @PostMapping("/updateBalance")
    public String updateAccountBalance(@RequestBody UpdateBalanceRequest request) {
        accountService.updateAccountBalance(request);
        return "Account balance updated successfully";
    }
}
