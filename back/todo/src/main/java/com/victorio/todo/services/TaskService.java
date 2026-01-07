package com.victorio.todo.services;

import com.victorio.todo.dto.task.TaskCreateDto;
import com.victorio.todo.dto.task.TaskResponseDto;
import com.victorio.todo.dto.task.TaskUpdateNameDto;
import com.victorio.todo.dto.task.TaskUpdateStatusDto;
import com.victorio.todo.enums.Status;
import com.victorio.todo.models.Task;
import com.victorio.todo.repositories.TaskRepository;
import com.victorio.todo.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import com.victorio.todo.models.User;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) { this.taskRepository = taskRepository; this.userRepository = userRepository;}

    public TaskResponseDto createTask(Long userId, TaskCreateDto task) {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User with ID:" + userId + " not found!"));
        Task newTask = new Task(task.name(), user);
        return new TaskResponseDto(taskRepository.save(newTask));
    }

    public List<TaskResponseDto> findTasksByUserId(Long userId) {
        return taskRepository.findByUser_Id(userId).stream().map(TaskResponseDto::new).toList();
    }

    public TaskResponseDto findTaskById(Long userId, Long taskId) {
       return new TaskResponseDto(findByUserIdAndTaskId(userId, taskId));
    }

    public TaskResponseDto updateTaskName(Long userId, Long taskId, TaskUpdateNameDto name) {
        Task task = findByUserIdAndTaskId(userId, taskId);
        String updatedName = name.name();
        if(updatedName != null && !updatedName.isBlank()){
            task.setName(updatedName);
        }
        return new TaskResponseDto(taskRepository.save(task));
    }

    public TaskResponseDto updateTaskStatus(Long userId, Long taskId, TaskUpdateStatusDto statusDto) {
        Task task = findByUserIdAndTaskId(userId, taskId);
        Status updatedStatus = statusDto.status();
        task.setStatus(updatedStatus);
        return new TaskResponseDto(taskRepository.save(task));
    }

    public void deleteTask(Long userId, Long taskId) {
        Task task = findByUserIdAndTaskId(userId, taskId);
        taskRepository.delete(task);
    }

    private Task findByUserIdAndTaskId (Long userId, Long taskId) {
        return taskRepository.findByIdAndUser_id(taskId, userId).orElseThrow(() -> new EntityNotFoundException("Task with ID:" + taskId + " not found!"));
    }

}
