package com.thejobseekr;

import java.io.InputStream;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.FirestoreOptions;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;

@SpringBootApplication
public class TheJobSeekrApp extends SpringBootServletInitializer{
	
	Logger logger = LoggerFactory.getLogger(TheJobSeekrApp.class);

	public static void main(String[] args) {
		SpringApplication.run(TheJobSeekrApp.class, args);
	}
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(TheJobSeekrApp.class);
	}

	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true); // you USUALLY want this
		config.addAllowedOrigin("*");
		config.addAllowedHeader("*");
		config.addAllowedMethod("GET");
		config.addAllowedMethod("PUT");
		config.addAllowedMethod("POST");
		config.addAllowedMethod("DELETE");
		config.addAllowedHeader("x-firebase-auth");
		source.registerCorsConfiguration("/**", config);
		return new CorsFilter(source);
	}
	
	@Bean
	public FirebaseAuth firebaseAuth() throws IOException {
		
		InputStream serviceAccount = this.getClass().getResourceAsStream(
				"/spring-firebase-test-firebase-adminsdk-ql2kg-95106115e4.json");

		FirestoreOptions fsOptions = FirestoreOptions
			.newBuilder()
			.setTimestampsInSnapshotsEnabled(true)
			.build();

		FirebaseOptions options = new FirebaseOptions
			.Builder()
			.setFirestoreOptions(fsOptions)
			.setCredentials(GoogleCredentials.fromStream(serviceAccount))
			.build();	
		
		if(FirebaseApp.getApps().isEmpty()) {
			FirebaseApp
				.initializeApp(options);
		}
		
		return FirebaseAuth
					.getInstance();
	}
}