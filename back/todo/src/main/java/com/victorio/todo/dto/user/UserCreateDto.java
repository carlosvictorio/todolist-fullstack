package com.victorio.todo.dto.user;

import com.victorio.todo.models.User;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserCreateDto(

        String name,
        @NotBlank(message = "Email is required!")
        @Email(message = "Email is invalid!")
        String email,
        @NotBlank(message = "Password is required")
        String password) {
    public UserCreateDto(User user) {
        this(user.getName(), user.getEmail(), user.getPassword());
    }
}
