package com.nwb.NWB_Authentication_Service.services;

import com.nwb.NWB_Authentication_Service.Repository.UserRepository;
import com.nwb.NWB_Authentication_Service.dto.AuthenticationRequest;
import com.nwb.NWB_Authentication_Service.dto.AuthenticationResponse;
import com.nwb.NWB_Authentication_Service.entity.User;
import com.nwb.NWB_Authentication_Service.enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.logging.Logger;

@Service
public class AuthenticationService {

    Logger logger = Logger.getLogger(AuthenticationService.class.getName());

    private final UserRepository userRepository;
    private final JWTService jwtService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthenticationService(UserRepository userRepository, JWTService jwtService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var user = userRepository.findUserByUsername(request.username())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if(user instanceof com.nwb.NWB_Authentication_Service.entity.User) {
            logger.info("User Object is clear");
        }else{
            logger.info("User Object is not clear");
        }
        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        String userName = user.getUsername();
        System.out.println("Username: " + userName);

        var token = jwtService.generateToken(userName);
        return new AuthenticationResponse(token);
    }

    // Optional: Registration method
    public void register(AuthenticationRequest request) {
        var encodedPassword = passwordEncoder.encode(request.password());
        var user = new User(request.username(), encodedPassword, Role.USER);
        userRepository.save(user);
    }
}
