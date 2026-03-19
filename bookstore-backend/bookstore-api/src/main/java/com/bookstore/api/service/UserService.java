package com.bookstore.api.service;
import com.bookstore.api.dto.LoginRequest;
import com.bookstore.api.dto.LoginResponse;
import com.bookstore.api.dto.RegisterRequest;
import com.bookstore.api.dto.RegisterResponse;
import com.bookstore.api.model.Role;
import com.bookstore.api.model.User;
import com.bookstore.api.repository.UserRepository;
import com.bookstore.api.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserService {
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public RegisterResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return RegisterResponse.builder()
                    .message("Email already registered ❌")
                    .build();
        }

        Role role = request.getRole() == null ? Role.CUSTOMER : request.getRole();

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword())) // ✅ hashed
                .role(role)
                .build();

        User savedUser = userRepository.save(user);

        return RegisterResponse.builder()
                .id(savedUser.getId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .message("User registered successfully ✅")
                .build();
    }
    // ✅ LOGIN  ← PASTE THIS EXACTLY HERE
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found ❌"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password ❌");
        }

        String token = jwtService.generateToken(user.getEmail());
        return LoginResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .token(token)
                .message("Login successful ✅")
                .build();
    }
}
