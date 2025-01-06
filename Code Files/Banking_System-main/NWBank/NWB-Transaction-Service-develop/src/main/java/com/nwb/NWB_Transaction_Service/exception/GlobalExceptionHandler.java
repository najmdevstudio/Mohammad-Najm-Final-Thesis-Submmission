package com.nwb.NWB_Transaction_Service.exception;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorDetails> handleCustomException(CustomException e , WebRequest request) {
        var errorDetails = new ErrorDetails(e.getMessage(), e.getStatusCode());
        return new ResponseEntity<>(errorDetails, null, e.getStatusCode());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> handleGlobalException(Exception ex, WebRequest request) {
        var errorDetails = new ErrorDetails("Internal Server Error", 500);
        return new ResponseEntity<>(errorDetails, null, 500);
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorDetails> handleValidationException(ValidationException e , WebRequest request) {
        var errorDetails = new ErrorDetails(e.getMessage(), e.getStatusCode());
        return new ResponseEntity<>(errorDetails, null, e.getStatusCode());
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorDetails> handleResourceNotFoundException(ResourceNotFoundException e , WebRequest request) {
        var errorDetails = new ErrorDetails(e.getMessage(), e.getStatusCode());
        return new ResponseEntity<>(errorDetails, null, e.getStatusCode());
    }

    private record ErrorDetails(String message, Integer statusCode) {}
}
