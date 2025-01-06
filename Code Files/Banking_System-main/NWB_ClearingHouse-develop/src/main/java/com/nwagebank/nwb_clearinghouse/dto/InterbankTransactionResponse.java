package com.nwagebank.nwb_clearinghouse.dto;

public record InterbankTransactionResponse(
        String status,
        String message,
        String transactionId
) {
}
