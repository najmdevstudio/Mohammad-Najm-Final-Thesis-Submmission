package com.nwb.NWB_Transaction_Service.dto;

import java.math.BigDecimal;

public record BalanceUpdateRequest(String accountNumber, BigDecimal newBalance) {
}
