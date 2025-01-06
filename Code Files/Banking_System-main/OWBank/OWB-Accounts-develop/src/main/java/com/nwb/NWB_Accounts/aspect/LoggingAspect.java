package com.nwb.NWB_Accounts.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {
    @Before("execution(* com.nwb.NWB_Accounts.services.*.*(..))")
    public void logBeforeServiceMethods(JoinPoint joinPoint) {
        System.out.println("Executing: " + joinPoint.getSignature());
    }

    @AfterReturning(pointcut = "execution(* com.nwb.NWB_Accounts.services.*.*(..))", returning = "result")
    public void logAfterReturningServiceMethods(JoinPoint joinPoint, Object result) {
        System.out.println("Completed: " + joinPoint.getSignature());
    }

    @AfterThrowing(pointcut = "execution(* com.nwb.NWB_Accounts.services.*.*(..))", throwing = "error")
    public void logAfterThrowingServiceMethods(JoinPoint joinPoint, Throwable error) {
        System.err.println("Exception in " + joinPoint.getSignature() + " with cause: " + error.getMessage());
    }
}
