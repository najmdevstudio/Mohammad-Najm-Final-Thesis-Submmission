package com.nwb.NWB_Transaction_Service.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record TransactionRequest(String fromAccount, String toAccount, String toIFSCCode , String fromIFSCCode ,BigDecimal amount, Instant timestamp) {
}
