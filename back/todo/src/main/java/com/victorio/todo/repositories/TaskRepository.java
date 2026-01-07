package com.victorio.todo.repositories;

import com.victorio.todo.models.Task;
import com.victorio.todo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser_Id(Long id);
    Optional<Task> findByIdAndUser_id(Long id, Long userId);
}
