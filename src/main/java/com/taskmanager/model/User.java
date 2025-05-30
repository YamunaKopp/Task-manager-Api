package com.taskmanager.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;

@Entity
@Table(name = "users")
@Data
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    private LocalDateTime createdAt = LocalDateTime.now();

    // ✅ These methods are required by Spring Security:

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList(); // You can return roles here if needed
    }

    @Override
    public String getUsername() {
        return email;  // Spring uses this as the login field
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;  // Account is valid
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;  // Not locked
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;  // Password is valid
    }

    @Override
    public boolean isEnabled() {
        return true;  // User is active
    }
}
