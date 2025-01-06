package com.nwb.NWB_API_Gateway;

import com.nwb.NWB_API_Gateway.filter.JwtAuthenticationFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.server.WebFilter;

@SpringBootApplication
public class NwbApiGatewayApplication {


	public static void main(String[] args) {
		SpringApplication.run(NwbApiGatewayApplication.class, args);
	}

}
