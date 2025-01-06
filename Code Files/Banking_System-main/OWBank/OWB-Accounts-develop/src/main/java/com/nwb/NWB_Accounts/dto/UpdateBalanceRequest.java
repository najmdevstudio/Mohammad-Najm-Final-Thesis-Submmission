package com.nwb.NWB_Accounts.dto;

import java.math.BigDecimal;

public record UpdateBalanceRequest(
        String accountNumber,
        BigDecimal newBalance
) {
}
