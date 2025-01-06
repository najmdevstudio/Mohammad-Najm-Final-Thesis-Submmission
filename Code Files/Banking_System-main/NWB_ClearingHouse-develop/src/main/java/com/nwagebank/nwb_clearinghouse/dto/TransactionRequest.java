package com.nwagebank.nwb_clearinghouse.dto;

import java.math.BigDecimal;

public record TransactionRequest(
        String fromAccount,
        String fromIFSCCode,
        String toAccount,
        String toIFSCCode,
        BigDecimal amount
) {
}
