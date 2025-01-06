package com.nwb.NWB_Authentication_Service.controller;

import com.nwb.NWB_Authentication_Service.dto.AuthenticationRequest;
import com.nwb.NWB_Authentication_Service.dto.AuthenticationResponse;
import com.nwb.NWB_Authentication_Service.services.AuthenticationService;
import com.nwb.NWB_Authentication_Service.services.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService tokenProvider;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService){
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthenticationRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.username(),
                        loginRequest.password()
                )
        );

        String jwt = tokenProvider.generateToken(String.valueOf(authentication.getName()));

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

    // Optional: Registration endpoint
    @PostMapping("/register")
    public String register(@RequestBody AuthenticationRequest request) {
        authenticationService.register(request);
        return "User registered successfully";
    }
}
