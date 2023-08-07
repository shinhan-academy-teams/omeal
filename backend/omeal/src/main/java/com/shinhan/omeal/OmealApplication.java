package com.shinhan.omeal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class OmealApplication {

	public static void main(String[] args) {
		SpringApplication.run(OmealApplication.class, args);
	}

}
