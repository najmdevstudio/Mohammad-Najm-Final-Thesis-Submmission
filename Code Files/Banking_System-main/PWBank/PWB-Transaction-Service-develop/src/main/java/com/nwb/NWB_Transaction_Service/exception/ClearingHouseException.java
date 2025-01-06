package com.nwb.NWB_Transaction_Service.exception;

public class ClearingHouseException extends RuntimeException {
    public ClearingHouseException(String message) {
        super(message);
    }

    public ClearingHouseException(String message, Throwable cause) {
        super(message, cause);
    }
}
