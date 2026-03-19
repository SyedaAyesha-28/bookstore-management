package com.bookstore.api.dto;

import com.bookstore.api.model.Role;
import lombok.Data;

@Data
public class RegisterRequest {

    private String name;
    private String email;
    private String password;
    private Role role;
}
