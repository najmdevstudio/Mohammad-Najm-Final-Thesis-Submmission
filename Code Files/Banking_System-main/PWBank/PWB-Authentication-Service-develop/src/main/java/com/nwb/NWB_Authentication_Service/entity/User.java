package com.nwb.NWB_Authentication_Service.entity;

import com.nwb.NWB_Authentication_Service.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.util.Set;


@Entity
@Table(name="PWB_Users")
public class User {


    @Id
    private String username;
    private String password;


    @Enumerated(EnumType.STRING)
    private Role Roles;

    public User(String username, String password, Role roles) {
        this.username = username;
        this.password = password;
        Roles = roles;
    }

    public User() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRoles() {
        return Roles;
    }

    public void setRoles(Role roles) {
        Roles = roles;
    }
}
