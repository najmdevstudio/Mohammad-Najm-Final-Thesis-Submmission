package com.nwb.NWB_Authentication_Service.services;

import com.nwb.NWB_Authentication_Service.Repository.UserRepository;
import com.nwb.NWB_Authentication_Service.entity.User;
import com.nwb.NWB_Authentication_Service.enums.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Function;

import java.security.Key;
import java.util.Date;
import java.util.stream.Collectors;

@Service
public class JWTService {

    @Value("${SECRET_KEY}")
    private String SECRET_KEY;


    private final UserRepository userRepository;

    @Autowired
    public JWTService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private Key getSigningKey(){
     return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(String username){
        System.out.println("Generating token for username: " + username);

        User user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Extract the user's roles
        String roles = "ROLE_"+user.getRoles();


        String token = Jwts.builder()
                .setSubject(username)
                .claim("role", roles)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000*60*60*20))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();


        System.out.println(token);
        return token;
    }

    public String extractUsernameFromToken(String token){
        String username = extractClaim(token, Claims::getSubject);
        System.out.println("username: " + username);
        return username;
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        var claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public Claims extractAllClaims(String token) {
        try {
            System.out.println("Parsing token: " + token);
            long periodCount = token.chars().filter(ch -> ch == '.').count();
            if (periodCount != 2) {
                throw new MalformedJwtException("Invalid token format. Expected 2 periods, found: " + periodCount);
            }
            return Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            System.err.println("Error parsing token: " + e.getMessage());
            throw new RuntimeException("Failed to parse token", e);
        }
    }

    public boolean isTokenValid(String token, String username) {
        var extractedUsername = extractUsernameFromToken(token);
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }


}
