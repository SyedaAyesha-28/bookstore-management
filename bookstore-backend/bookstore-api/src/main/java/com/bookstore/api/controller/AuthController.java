package com.bookstore.api.controller;
import com.bookstore.api.dto.LoginRequest;
import com.bookstore.api.dto.LoginResponse;
import com.bookstore.api.dto.RegisterRequest;
import com.bookstore.api.dto.RegisterResponse;
import com.bookstore.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final UserService userService;
    // ✅ Constructor injection (works always)
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public RegisterResponse register(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }

}
