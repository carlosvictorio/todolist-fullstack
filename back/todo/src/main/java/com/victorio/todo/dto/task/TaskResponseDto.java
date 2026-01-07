package com.victorio.todo.dto.task;

import com.victorio.todo.enums.Status;
import com.victorio.todo.models.Task;

import java.time.Instant;

public record TaskResponseDto(Long id, String name, Status status, Instant createdAt, Instant updatedAt) {
    public TaskResponseDto(Task task) {
        this(task.getId(), task.getName(), task.getStatus(), task.getCreatedAt(), task.getUpdatedAt());
    }
}
