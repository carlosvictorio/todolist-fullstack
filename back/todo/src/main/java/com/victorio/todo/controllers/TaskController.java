package com.victorio.todo.controllers;

import com.victorio.todo.dto.task.TaskCreateDto;
import com.victorio.todo.dto.task.TaskResponseDto;
import com.victorio.todo.dto.task.TaskUpdateNameDto;
import com.victorio.todo.dto.task.TaskUpdateStatusDto;
import com.victorio.todo.services.TaskService;
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
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @Operation(
            summary = "Create task"
    )
    @PostMapping
    public ResponseEntity<TaskResponseDto> createTask(@AuthenticationPrincipal Long userId, @RequestBody @Valid TaskCreateDto taskCreateDto) {
        TaskResponseDto createdTask = taskService.createTask(userId, taskCreateDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }

    @Operation(
            summary = "Get all tasks by logged-in user"
    )
    @GetMapping
    public ResponseEntity<List<TaskResponseDto>> getTasksByUser (@AuthenticationPrincipal Long userId) {
        List<TaskResponseDto> tasks = taskService.findTasksByUserId(userId);
        return ResponseEntity.status(HttpStatus.OK).body(tasks);
    }

    //Verificar se só ADMINS tem acesso a essa rota
    @Operation(
            summary = "Get task by its ID",
            description = "Gets task of the logged-in user by Task ID"
    )
    @GetMapping("/{taskId}")
    public ResponseEntity<TaskResponseDto> getTaskById (@AuthenticationPrincipal Long userId, @PathVariable Long taskId) {
        TaskResponseDto taskFound = taskService.findTaskById(userId, taskId);
        return ResponseEntity.status(HttpStatus.OK).body(taskFound);

    }

    @Operation(
            summary = "Update tasks name by taskId",
            description = """
                    Updates name of a task identified by its ID <br>
                    The task belongs to the currently logged-in user
                    """
    )
    @PatchMapping("/{taskId}/name")
    public ResponseEntity<TaskResponseDto> updateTaskName(@AuthenticationPrincipal Long userId, @PathVariable Long taskId, @RequestBody TaskUpdateNameDto name) {
        TaskResponseDto taskUpdated = taskService.updateTaskName(userId, taskId, name);
        return ResponseEntity.status(HttpStatus.OK).body(taskUpdated);
    }

    @Operation(
            summary = "Update tasks status by taskId",
            description = """
                    Updates status of a task identified by its ID <br>
                    The task belongs to the currently logged-in user
                    """
    )
    @PatchMapping("/{taskId}/status")
    public ResponseEntity<TaskResponseDto> updateTaskStatus(@AuthenticationPrincipal Long userId, @PathVariable Long taskId,  @RequestBody TaskUpdateStatusDto statusDto) {
        TaskResponseDto taskUpdated = taskService.updateTaskStatus(userId, taskId, statusDto);
        return ResponseEntity.status(HttpStatus.OK).body(taskUpdated);
    }

    @Operation(
            summary = "Delete tasks by taskId",
            description = """
                    Deletes a task identified by its ID <br>
                    The task belongs to the currently logged-in user
                    """
    )
    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@AuthenticationPrincipal Long userId, @PathVariable Long taskId) {
        taskService.deleteTask(userId, taskId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
