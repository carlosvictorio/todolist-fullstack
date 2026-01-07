package com.victorio.todo.controllers;

import com.victorio.todo.dto.user.UserCreateDto;
import com.victorio.todo.dto.user.UserResponseDto;
import com.victorio.todo.dto.user.UserUpdateDto;
import com.victorio.todo.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserResponseDto> createUser(@RequestBody @Valid UserCreateDto userCreateDto) {
        UserResponseDto userResponse = userService.createUser(userCreateDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(userResponse);
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.status(HttpStatus.OK).body("Funcionou!");
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        List <UserResponseDto> allUsers = userService.findAllUsers();
        return ResponseEntity.status(HttpStatus.OK).body(allUsers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable Long id) {
        UserResponseDto user = userService.findUserById(id);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDto> getMe(@AuthenticationPrincipal Long userId) {
        UserResponseDto userLogged = userService.findUserById(userId);
        return ResponseEntity.status(HttpStatus.OK).body(userLogged);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UserResponseDto> updateUserById(@PathVariable Long id, @RequestBody @Valid UserUpdateDto userUpdateDto) {
        UserResponseDto updatedUser = userService.updateUser(id, userUpdateDto);
        return ResponseEntity.status(HttpStatus.OK).body(updatedUser);
    }

    @PatchMapping("/me")
    public ResponseEntity<UserResponseDto> updateMe(@AuthenticationPrincipal Long userId, @RequestBody UserUpdateDto data) {
        UserResponseDto userUpdated = userService.updateUser(userId, data);
        return ResponseEntity.status(HttpStatus.OK).body(userUpdated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteMe(@AuthenticationPrincipal Long UserId) {
        userService.deleteUser(UserId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
