package com.bookstore.api.dto;

import lombok.Builder;
import lombok.Data;
import com.bookstore.api.model.Role;
@Data
@Builder
public class LoginResponse {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private String token;
    private String message;
}
