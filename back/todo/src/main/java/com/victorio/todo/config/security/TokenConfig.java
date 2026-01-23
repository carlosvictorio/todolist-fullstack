package com.victorio.todo.config.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.victorio.todo.models.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.time.Instant;
import java.util.Optional;

@Component
public class TokenConfig {

    @Value("${TOKEN_SECRET}")
    private String secret;

    public String generateToken(User user) {

        Algorithm algorithm = Algorithm.HMAC256(secret);

        return JWT.create()
                .withClaim("userId", user.getId())
                .withClaim("roles", user.getRoles().stream().map(Enum::name).toList())
                .withSubject(user.getEmail())
                .withExpiresAt(Instant.now().plusSeconds(80000))
                .withIssuedAt(Instant.now())
                .sign(algorithm);
    }

    public Optional<UserDataJWT> validateToken (String token) {
        try{
            Algorithm algorithm = Algorithm.HMAC256(secret);
            DecodedJWT decode = JWT.require(algorithm).build().verify(token);
            return Optional.of(
                    new UserDataJWT(
                            decode.getClaim("userId").asLong(),
                            decode.getSubject(),
                            decode.getClaim("roles").asList(String.class)
                    ));
        } catch (JWTVerificationException ex) {
            return Optional.empty();
        }

    }
}
