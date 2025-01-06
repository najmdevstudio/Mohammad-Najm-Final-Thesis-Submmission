package com.nwb.NWB_Transaction_Service.dto;

import com.nwb.NWB_Transaction_Service.enums.AccountStatus;

import java.math.BigDecimal;

public record AccountValidationResponse(String accountNumber, BigDecimal balance, AccountStatus status) {
}
