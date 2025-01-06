package com.nwb.NWB_Accounts.exceptions;

public class CustomException extends RuntimeException {
    private final String message;
    private final int statusCode;

    public CustomException(String message, int statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }

    // Getters
    public String getMessage() {
        return message;
    }

    public int getStatusCode() {
        return statusCode;
    }
}
