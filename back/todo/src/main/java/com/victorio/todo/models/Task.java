package com.victorio.todo.models;

import com.victorio.todo.enums.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "tasks")
public class Task extends Auditable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String name;
    @Enumerated(value = EnumType.STRING)
    private Status status;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Task(String name, User user) {
        this.name = name;
        this.user = user;
        this.status = Status.PENDENT;
    }

    public Task() {
    }

    public Long getId() {
        return id;
    }

    public @NotBlank String getName() {
        return name;
    }

    public void setName(@NotBlank String name) {
        this.name = name;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public Long getUserId() {
        return user.getId();
    }
}
