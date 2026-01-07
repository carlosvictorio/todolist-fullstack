package com.victorio.todo.dto.user;

import com.victorio.todo.enums.Roles;
import com.victorio.todo.models.User;

import java.time.Instant;
import java.util.Set;

public record UserResponseDto(Long id, String name, String email, Set<Roles> roles, Instant createdAt, Instant updatedAt) {

    public UserResponseDto(User user) {
        this(user.getId(), user.getName(), user.getEmail(), user.getRoles(), user.getCreatedAt(), user.getUpdatedAt());
    }

}
