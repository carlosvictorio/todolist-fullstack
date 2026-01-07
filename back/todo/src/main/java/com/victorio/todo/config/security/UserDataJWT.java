package com.victorio.todo.config.security;

import java.util.List;

public record UserDataJWT(Long id, String email, List<String> roles) {
}
