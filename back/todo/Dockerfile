# BUILD
# Usar Alpine aqui pode dar erros em algumas dependencias do Maven
FROM maven:3.9.11-eclipse-temurin-17 AS build

WORKDIR /app
COPY pom.xml .

#Força o download de todas as dependências antes da compilação, fazendo o build falhar cedo caso der problema de rede, evitando erros no meio do processo
RUN mvn -B dependency:go-offline #

COPY src src
RUN mvn -B clean package -DskipTests

# RUNTIME
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
