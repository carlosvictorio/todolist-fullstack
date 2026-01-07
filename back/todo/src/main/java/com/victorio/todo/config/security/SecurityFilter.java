package com.victorio.todo.config.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    private final TokenConfig tokenConfig;

    public SecurityFilter(TokenConfig tokenConfig) {this.tokenConfig = tokenConfig;};

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorizedHeader = request.getHeader("Authorization");

        if(authorizedHeader != null && authorizedHeader.startsWith("Bearer ")) {
            String token = authorizedHeader.substring("Bearer ".length());
            Optional<UserDataJWT> userDataJWT = tokenConfig.validateToken(token);
            if(userDataJWT.isPresent()) {
                UserDataJWT userData = userDataJWT.get();

                List<SimpleGrantedAuthority> authorities = userData.roles().stream().map(SimpleGrantedAuthority::new).toList();

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userData.id(), null, authorities);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        filterChain.doFilter(request, response);

    }
}
