package com.victorio.todo.exceptions;

import java.util.Map;

public record ValidationErrorResponse(Map<String, String> errors) {
}
