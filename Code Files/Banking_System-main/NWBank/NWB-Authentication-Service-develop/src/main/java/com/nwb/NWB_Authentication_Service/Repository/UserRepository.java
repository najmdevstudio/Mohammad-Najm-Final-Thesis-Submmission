package com.nwb.NWB_Authentication_Service.Repository;

import com.nwb.NWB_Authentication_Service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findUserByUsername(String username);
}
