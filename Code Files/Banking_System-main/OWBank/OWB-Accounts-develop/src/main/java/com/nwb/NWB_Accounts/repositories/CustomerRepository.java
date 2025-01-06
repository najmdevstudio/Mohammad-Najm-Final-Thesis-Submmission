package com.nwb.NWB_Accounts.repositories;

import com.nwb.NWB_Accounts.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
