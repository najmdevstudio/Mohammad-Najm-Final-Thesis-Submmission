package com.nwb.NWB_Authentication_Service.filters;

import com.nwb.NWB_Authentication_Service.services.CustomUserDetailsService;
import com.nwb.NWB_Authentication_Service.services.JWTService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JWTService tokenProvider;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        String jwt = null;
        String username = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7); // Remove "Bearer " prefix
            System.out.println("Extracted JWT: " + jwt);

            // Check if the token has the correct format
            long periodCount = jwt.chars().filter(ch -> ch == '.').count();
            if (periodCount != 2) {
                System.err.println("Invalid JWT format. Expected 2 periods, found: " + periodCount);
            }

            username = tokenProvider.extractUsernameFromToken(jwt);
            System.out.println("Extracted Username: " + username);
        } else {
            System.out.println("Invalid Authorization header");
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Load user details
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            Claims claims = tokenProvider.extractAllClaims(jwt);

            String role = claims.get("role", String.class);

            System.out.println("ROLE: " + role);

            GrantedAuthority authorities = new SimpleGrantedAuthority(role);
            List<GrantedAuthority> authoritiesList = new ArrayList<>();
            authoritiesList.add(authorities);

            // Validate the token
            if (tokenProvider.isTokenValid(jwt, userDetails.getUsername())) {
                // Check if user has ADMIN role
                System.out.println("User Authorities:"+userDetails.getAuthorities());

                if (role.equals("ROLE_ADMIN")) {
                    // Create authentication token
                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    authoritiesList
                            );
                    authenticationToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );
                    // Set the authentication in the security context
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    System.out.println("User authorized with ADMIN role");
                } else {
                    // User does not have ADMIN role, deny access
                    System.out.println("User does not have ADMIN role");
                    response.sendError(HttpServletResponse.SC_FORBIDDEN, "Access Denied: Admin role required");
                    return;
                }
            }
        }
        // Proceed with authentication logic...
        filterChain.doFilter(request, response);
    }

    // Helper method to extract JWT from the request header
    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return null;
    }
}
