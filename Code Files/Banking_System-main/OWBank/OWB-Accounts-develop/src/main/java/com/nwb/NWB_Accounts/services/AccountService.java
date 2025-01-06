package com.nwb.NWB_Accounts.services;

import com.nwb.NWB_Accounts.dto.AccountDTO;
import com.nwb.NWB_Accounts.dto.AccountValidationResponse;
import com.nwb.NWB_Accounts.dto.CreateAccountRequest;
import com.nwb.NWB_Accounts.dto.UpdateBalanceRequest;

import java.util.List;

public interface AccountService {
    AccountDTO createAccount(CreateAccountRequest request);
    void deleteAccount(String accountNumber);
    AccountDTO getAccountByNumber(String accountNumber);
    List<AccountDTO> getAllAccounts();
    AccountValidationResponse validateAccount(String accountNumber);
    void updateAccountBalance(UpdateBalanceRequest request);
}
