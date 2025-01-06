package com.nwb.NWB_Accounts.exceptions;

public class ResourceNotFoundException extends CustomException{
    public ResourceNotFoundException(String message) {
        super(message, 404);
    }
}
