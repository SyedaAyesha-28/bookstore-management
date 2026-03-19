package com.bookstore.api.dto;
import com.bookstore.api.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterResponse {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private String message;
}
