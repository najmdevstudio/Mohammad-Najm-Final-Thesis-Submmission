package com.nwb.NWB_Authentication_Service.initializers;

import com.nwb.NWB_Authentication_Service.Repository.UserRepository;
import com.nwb.NWB_Authentication_Service.services.JWTService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import com.nwb.NWB_Authentication_Service.entity.User;
import com.nwb.NWB_Authentication_Service.enums.Role;

import java.util.Objects;
import java.util.Set;
import java.util.logging.Logger;

@Component
@Order(Ordered.LOWEST_PRECEDENCE)
public class DataInitializer implements CommandLineRunner {

    Logger logger = Logger.getLogger(DataInitializer.class.getName());

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JWTService jwtService;

    @Value("${root.username}")
    private String rootUsername;

    @Value("${root.password}")
    private String rootPassword;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User rootUser = new User();
            rootUser.setUsername(rootUsername);
            rootUser.setPassword(passwordEncoder.encode(rootPassword));
            rootUser.setRoles(Role.ADMIN);
            userRepository.save(rootUser);
            System.out.println(jwtService.generateToken(rootUsername));
        }

        if (userRepository.count() == 0) {
            logger.info("Root user creation failed");
        } else if(userRepository.count() == 1) {
            logger.info("Root user already exists.");
            System.out.println(jwtService.generateToken(rootUsername));
        }else{
            logger.info("Root creation is getting some errors");
        }


    }

}
