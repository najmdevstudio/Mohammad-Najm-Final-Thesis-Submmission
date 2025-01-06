package com.nwb.NWB_Transaction_Service.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {
    @Before("execution(* com.nwb.NWB_Transaction_Service.service.*.*(..))")
    public void logBeforeServiceMethods(JoinPoint joinPoint) {
        System.out.println("Executing: " + joinPoint.getSignature());
    }

    @AfterReturning(pointcut = "execution(* com.nwb.NWB_Transaction_Service.service.*.*(..))", returning = "result")
    public void logAfterReturningServiceMethods(JoinPoint joinPoint, Object result) {
        System.out.println("Completed: " + joinPoint.getSignature());
    }

    @AfterThrowing(pointcut = "execution(* com.nwb.NWB_Transaction_Service.service.*.*(..))", throwing = "error")
    public void logAfterThrowingServiceMethods(JoinPoint joinPoint, Throwable error) {
        System.err.println("Exception in " + joinPoint.getSignature() + " with cause: " + error.getMessage());
    }
}
