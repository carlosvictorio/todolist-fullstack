package com.victorio.todo.dto.user;

import jakarta.validation.constraints.Email;

public record UserUpdateDto(String name, @Email String email, String password) {

}
