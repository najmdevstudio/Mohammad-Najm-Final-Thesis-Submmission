package com.nwagebank.nwb_clearinghouse.exceptions;

public class ResourceNotFoundException extends CustomExceptionHandler{
    public ResourceNotFoundException(String message) {
        super(message, 404);
    }
}
