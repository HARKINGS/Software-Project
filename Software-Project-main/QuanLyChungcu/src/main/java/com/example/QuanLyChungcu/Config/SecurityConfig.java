package com.example.QuanLyChungcu.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // Phân quyền theo URL
                        .requestMatchers("/login", "/img/**", "/js/**", "/css/**").permitAll() // Không yêu cầu đăng nhập
                        .requestMatchers("/getAllNotification").hasAnyRole("ADMIN", "USER") // Cho phép cả ADMIN và USER
                        .requestMatchers("/admin/**").hasRole("ADMIN") // Chỉ ADMIN được phép
                        .requestMatchers("/user/**").hasRole("USER")   // Chỉ USER được phép
                        .anyRequest().authenticated() // Các URL còn lại yêu cầu đăng nhập
                )
                .formLogin(form -> form
                        .loginPage("/login")
                        .loginProcessingUrl("/login") // Trang đăng nhập tùy chỉnh
                        .permitAll()
                        .successHandler((request, response, authentication) -> {
                            // Chuyển hướng sau khi đăng nhập thành công dựa trên vai trò
                            String redirectUrl = authentication.getAuthorities().stream()
                                    .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN")) ? "/admin" : "/user";
                            response.sendRedirect(redirectUrl); // Chuyển hướng đến /admin hoặc /user tùy thuộc vào vai trò
                        })
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/login?logout")
                        .permitAll()
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Sử dụng Bcrypt để mã hóa mật khẩu
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public HttpFirewall httpFirewall() {
        StrictHttpFirewall firewall = new StrictHttpFirewall();
        firewall.setAllowSemicolon(true); // Cho phép ký tự ";"
        return firewall;
    }
}
