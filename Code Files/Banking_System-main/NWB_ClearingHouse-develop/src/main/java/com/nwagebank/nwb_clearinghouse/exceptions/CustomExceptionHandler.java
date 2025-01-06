package com.nwagebank.nwb_clearinghouse.exceptions;

public class CustomExceptionHandler extends RuntimeException {
    public CustomExceptionHandler(String message, int i) {
        super(message);
    }
}
