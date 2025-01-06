package com.nwb.NWB_Transaction_Service.exception;

public class ResourceNotFoundException extends CustomException {
    public ResourceNotFoundException(String message) {
        super(message,404);
    }
}
