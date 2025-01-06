package com.nwb.NWB_Transaction_Service.exception;

public class ValidationException extends CustomException{
    public ValidationException(String message) {
        super(message,400);
    }
}
