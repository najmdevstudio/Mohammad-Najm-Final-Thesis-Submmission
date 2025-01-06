package com.nwb.NWB_Accounts.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorDetails> handleCustomException(CustomException ex, WebRequest request) {
        var errorDetails = new ErrorDetails(ex.getMessage(), ex.getStatusCode());
        return new ResponseEntity<>(errorDetails, null, ex.getStatusCode());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> handleGlobalException(Exception ex, WebRequest request) {
        var errorDetails = new ErrorDetails("Internal Server Error", 500);
        return new ResponseEntity<>(errorDetails, null, 500);
    }

    // ErrorDetails record
    private record ErrorDetails(String message, int statusCode) {}
}
