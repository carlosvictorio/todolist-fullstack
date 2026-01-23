package com.victorio.todo.controllers;

import com.victorio.todo.dto.user.UserCreateDto;
import com.victorio.todo.dto.user.UserResponseDto;
import com.victorio.todo.dto.user.UserUpdateDto;
import com.victorio.todo.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(
            summary = "Create User",
            description = "*Restricted to ADMIN* <br>"
    )
    @PostMapping
    public ResponseEntity<UserResponseDto> createUser(@RequestBody @Valid UserCreateDto userCreateDto) {
        UserResponseDto userResponse = userService.createUser(userCreateDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(userResponse);
    }

    @Operation(
            summary = "Test it"
    )
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.status(HttpStatus.OK).body("Funcionou!");
    }

    @Operation(
            summary = "Get all users",
            description = "*Restricted to ADMIN* <br>"
    )
    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        List <UserResponseDto> allUsers = userService.findAllUsers();
        return ResponseEntity.status(HttpStatus.OK).body(allUsers);
    }

    @Operation(
            summary = "Get user by ID",
            description = """
                    *Restricted to ADMIN* <br>
                    Gets any user by their ID
                    """
    )
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable Long id) {
        UserResponseDto user = userService.findUserById(id);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @Operation(
            summary = "Get logged-in user"
    )
    @GetMapping("/me")
    public ResponseEntity<UserResponseDto> getMe(@AuthenticationPrincipal Long userId) {
        UserResponseDto userLogged = userService.findUserById(userId);
        return ResponseEntity.status(HttpStatus.OK).body(userLogged);
    }

    @Operation(
            summary = "Update user by ID",
            description = """
                    *Restricted to ADMIN* <br>
                    Updates any user by their ID
                    """
    )
    @PatchMapping("/{id}")
    public ResponseEntity<UserResponseDto> updateUserById(@PathVariable Long id, @RequestBody @Valid UserUpdateDto userUpdateDto) {
        UserResponseDto updatedUser = userService.updateUser(id, userUpdateDto);
        return ResponseEntity.status(HttpStatus.OK).body(updatedUser);
    }

    @Operation(
            summary = "Update logged-in user"
    )
    @PatchMapping("/me")
    public ResponseEntity<UserResponseDto> updateMe(@AuthenticationPrincipal Long userId, @RequestBody UserUpdateDto data) {
        UserResponseDto userUpdated = userService.updateUser(userId, data);
        return ResponseEntity.status(HttpStatus.OK).body(userUpdated);
    }

    @Operation(
            summary = "Delete user by ID",
            description = """
                    *Restricted to ADMIN* <br>
                    Deletes any user by their ID
                    """
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Operation(
            summary = "Delete logged-in user"
    )
    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteMe(@AuthenticationPrincipal Long UserId) {
        userService.deleteUser(UserId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
