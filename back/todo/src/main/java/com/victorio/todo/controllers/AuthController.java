package com.victorio.todo.controllers;

import com.victorio.todo.config.security.TokenConfig;
import com.victorio.todo.dto.user.LoginRequest;
import com.victorio.todo.dto.user.LoginResponse;
import com.victorio.todo.dto.user.UserCreateDto;
import com.victorio.todo.dto.user.UserResponseDto;
import com.victorio.todo.models.User;
import com.victorio.todo.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final TokenConfig tokenConfig;

    public AuthController(UserService userService, AuthenticationManager authenticationManager, TokenConfig tokenConfig) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.tokenConfig = tokenConfig;
    }

    @Operation(
            summary = "Login",
            description = """
            Conta ADMIN: <br>
            E-mail:admin@admin.com <br>
            Password:admin <br>
            """
    )
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        UsernamePasswordAuthenticationToken usernameAndPassword = new UsernamePasswordAuthenticationToken(request.email(), request.password());
        Authentication authentication = authenticationManager.authenticate(usernameAndPassword);
        User userAuthenticated = (User) authentication.getPrincipal();
        String token = tokenConfig.generateToken(userAuthenticated);
        return ResponseEntity.status(HttpStatus.OK).body(new LoginResponse(token, userAuthenticated.getName(), userAuthenticated.getEmail(), userAuthenticated.getRoles().stream().map(Enum::toString).toList()));
    }

    @Operation(summary = "Register")
    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> register(@Valid @RequestBody UserCreateDto request) {
        System.out.println(request);
        UserResponseDto newUser = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

}
