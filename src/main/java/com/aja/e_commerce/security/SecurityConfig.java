package com.aja.e_commerce.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig{

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests((request) -> request
                        // Allowing access to static resources and specific files for public access
                        .requestMatchers("/static/**", "/index.html", "/manifest.json", "/asset-manifest.json",
                                "/ogu.ico", "/ogu192.png", "/ogu512.png", "/robots.txt")
                        .permitAll()
                        // Allowing access to the access-denied page
                        .requestMatchers("/access-denied").permitAll()
                        // Only allowing access to the login page and the login processing endpoint if user not authenticated
                        .requestMatchers("/login","/login/process").anonymous()
                        // Allowing access to the public API
                        .requestMatchers("/", "/api/public/**").permitAll()
                        // Any other request must be authenticated
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/login")
                        .loginProcessingUrl("/login/process")
                        .defaultSuccessUrl("/", true)
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/")
                        .deleteCookies("JSSESSIONID"))
                .exceptionHandling(exception -> exception
                        .accessDeniedHandler(new CustomAccessDeniedHandler()))
                .sessionManagement(policy -> policy.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
                .httpBasic(Customizer.withDefaults());
                
        return http.build();
    }

    
}