package com.nwb.NWB_Authentication_Service.services;

import com.nwb.NWB_Authentication_Service.Repository.UserRepository;
import com.nwb.NWB_Authentication_Service.entity.User;
import com.nwb.NWB_Authentication_Service.enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("USERNAME:"+username);
        User user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                getAuthorities(user)
        );
    }

    private Collection<? extends GrantedAuthority> getAuthorities(User user) {
        List<GrantedAuthority> authorities = new ArrayList<>();

        if (user.getRoles() != null) {
            List<Role> rolesList = new ArrayList<>(user.getRoles().ordinal());
            for (Role role : rolesList) {
                String roleName = role.name();
                String authorityName = "ROLE_" + roleName;
                authorities.add(new SimpleGrantedAuthority(authorityName));
            }
        }

        return authorities;
    }
}
