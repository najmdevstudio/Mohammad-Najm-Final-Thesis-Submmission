package com.nwb.NWB_Authentication_Service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.nwb.NWB_Authentication_Service", "com.nwb.NWB_Authentication_Service.initializers"})
public class NwbAuthenticationServiceApplication {

	public static void main(String[] args) {

		SpringApplication.run(NwbAuthenticationServiceApplication.class, args);

	}

}
