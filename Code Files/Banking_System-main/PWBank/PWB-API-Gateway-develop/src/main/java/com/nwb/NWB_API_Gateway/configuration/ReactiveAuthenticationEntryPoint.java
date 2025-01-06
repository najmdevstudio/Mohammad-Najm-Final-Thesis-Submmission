package com.nwb.NWB_API_Gateway.configuration;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.server.ServerAuthenticationEntryPoint;
import org.springframework.security.web.server.authentication.HttpStatusServerEntryPoint;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

public class ReactiveAuthenticationEntryPoint implements ServerAuthenticationEntryPoint {

    private final ServerAuthenticationEntryPoint delegate = new HttpStatusServerEntryPoint(HttpStatus.UNAUTHORIZED);

    @Override
    public Mono<Void> commence(ServerWebExchange exchange, AuthenticationException e) {
        // You can customize the response here or just delegate:
        return delegate.commence(exchange, e);
    }
}
