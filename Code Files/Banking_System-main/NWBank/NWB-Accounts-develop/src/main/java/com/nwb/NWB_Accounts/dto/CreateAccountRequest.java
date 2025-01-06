package com.nwb.NWB_Accounts.dto;

import java.math.BigDecimal;

public record CreateAccountRequest(
        String accountNumber,
        BigDecimal initialBalance,
        CustomerDTO customer
) {
}
