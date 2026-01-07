package com.victorio.todo.dto.user;

import java.util.List;

public record LoginResponse(String token, String name, String email, List<String> roles) {
}
