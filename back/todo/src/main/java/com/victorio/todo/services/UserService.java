package com.victorio.todo.services;

import com.victorio.todo.dto.user.UserCreateDto;
import com.victorio.todo.dto.user.UserResponseDto;
import com.victorio.todo.dto.user.UserUpdateDto;
import com.victorio.todo.models.User;
import com.victorio.todo.repositories.UserRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponseDto createUser(UserCreateDto userDto) {
       if(userRepository.existsByEmail(userDto.email())) {
           throw new EntityExistsException("User already exists!");
       }

       User user = new User(userDto.name(), userDto.email(), passwordEncoder.encode(userDto.password()));
       return new UserResponseDto(userRepository.save(user));
    }

    public List<UserResponseDto> findAllUsers() {
        return userRepository.findAll().stream().map(UserResponseDto::new).toList();
    }

    public UserResponseDto findUserById(Long id) {
        User user = findUser(id);
        return new UserResponseDto(user);
    }

    public UserResponseDto updateUser(Long id, UserUpdateDto userDto) {
        User user = findUser(id);

        if(hasText(userDto.name())) {
            user.setName(userDto.name());
        }

        if(hasText(userDto.email())) {
            user.setEmail(userDto.email());
        }

        if(hasText(userDto.password())) {
            user.setPassword(passwordEncoder.encode(userDto.password()));
        }

        return new UserResponseDto(userRepository.save(user));
    }

    private boolean hasText(String value) {
        return value != null && !value.isBlank();
    }

    public void deleteUser(Long id) {
        User user = findUser(id);
        userRepository.delete(user);
    }

    private User findUser(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User with ID:" + id + " not found!"));
    }

}
