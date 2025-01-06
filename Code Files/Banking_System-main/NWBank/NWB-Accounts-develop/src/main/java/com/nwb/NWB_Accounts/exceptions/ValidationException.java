package com.nwb.NWB_Accounts.exceptions;

public class ValidationException extends CustomException{
    public ValidationException(String message) {
        super(message, 400);
    }
}
