package com.nwagebank.nwb_clearinghouse.exceptions;

import lombok.Getter;

public class CustomException extends RuntimeException {
    private final String message;
    private final Integer statusCode;

    public CustomException(String message, Integer statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }


    @Override
    public String getMessage() {
        return message;
    }

    public Integer getStatusCode() {
        return statusCode;
    }
}
