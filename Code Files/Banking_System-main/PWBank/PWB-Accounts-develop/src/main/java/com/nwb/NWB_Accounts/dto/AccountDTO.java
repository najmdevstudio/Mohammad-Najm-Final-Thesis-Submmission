package com.nwb.NWB_Accounts.dto;

import com.nwb.NWB_Accounts.enums.AccountStatus;

import java.math.BigDecimal;

public record AccountDTO(
        String accountNumber,
        BigDecimal balance,
        AccountStatus status,
        CustomerDTO customer
) {
}
