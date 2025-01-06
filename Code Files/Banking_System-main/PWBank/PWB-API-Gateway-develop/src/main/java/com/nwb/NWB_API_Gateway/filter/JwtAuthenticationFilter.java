package com.nwb.NWB_API_Gateway.filter;

import io.jsonwebtoken.security.Keys;

import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.WebFilter;

import io.jsonwebtoken.*;

import org.springframework.beans.factory.annotation.Value;


import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import org.springframework.web.server.WebFilterChain;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;


@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class JwtAuthenticationFilter implements WebFilter {

    private final Logger logger = Logger.getLogger(JwtAuthenticationFilter.class.getName());

    @Value("${jwt.secret}")
    private String secretKey;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        var request = exchange.getRequest();

        // Allow requests to the authentication service
        if (request.getURI().getPath().startsWith("/auth")) {
            return chain.filter(exchange);
        }

        // Get the Authorization header
        var authHeader = request.getHeaders().getFirst("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            exchange.getResponse().setStatusCode(org.springframework.http.HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
        logger.info("Request Received with header: " + authHeader);
        var token = authHeader.substring(7);
        Claims claims;
        try {
            claims = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (JwtException e) {
            exchange.getResponse().setStatusCode(org.springframework.http.HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        // Extract username from claims
        String username = claims.getSubject();
        if (username == null || username.isEmpty()) {
            exchange.getResponse().setStatusCode(org.springframework.http.HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        // If you store roles in your token (e.g. "roles": ["ROLE_USER", "ROLE_ADMIN"]), extract them:
        String role = claims.get("role", String.class);
        List<GrantedAuthority> authorities = new ArrayList<>();
        if (role != null) {
                authorities.add(new SimpleGrantedAuthority(role));
        }

        // Create an Authentication object
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
        System.out.println(authentication.toString());
        // Wrap the chain call with contextWrite to set the authentication in the Reactor context
        return chain.filter(exchange)
                .contextWrite(ReactiveSecurityContextHolder.withAuthentication(authentication));
    }
}
