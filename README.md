# TO-DO List

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

---

## Descrição

O **TO-DO List** é uma aplicação que permite aos usuários **organizar suas tarefas do dia a dia**. Cada usuário pode criar uma conta, fazer login e gerenciar suas próprias tarefas, que permanecem salvas no banco de dados até serem deletadas.

O projeto também foi desenvolvido para **demonstrar habilidades na integração entre frontend e backend**, utilizando **React** no front-end, **Spring Boot** no back-end, autenticação via **JWT** e documentação de todos os endpoints com **Swagger/OpenAPI**.

---

## Funcionalidades

- **Gerenciamento de tarefas**: criar, atualizar, deletar e listar tarefas, com status pendente/concluída.
- **Autenticação e contas de usuário**: registro, login e acesso restrito às próprias tarefas.
- **Integração frontend ↔ backend**:
  - Front-end em React consumindo API via **Fetch API**
  - Back-end em Spring Boot expondo endpoints REST
  - Atualização em tempo real da interface ao criar, atualizar ou deletar tarefas
- **Rotas protegidas**: acesso com JWT
- **Documentação da API**: todos os endpoints documentados com **Swagger/OpenAPI**
  - [Acesse a documentação Swagger](SEU_LINK_SWAGGER)

---

## Demo

### Tela de Login
![Login](screenshots/login.png)

### Tela de Tarefas
![Tasks](screenshots/gif-demostration.gif)

### Tela de Edição de Usuário
![Editar Usuário](screenshots/edit.gif)


## Como Utilizar o Projeto

### Pré-requisitos

- Java 17
- Maven
- Node.js (>=18)
- PostgreSQL

### Configuração do Back-end

1. Crie um banco PostgreSQL (ex.: `todo_db`)
2. Configure conexão no arquivo `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/todo_db
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA
```
3. Instale as dependências do projeto com o comando: `mvn clean install`

4. Rode o projeto, depois disso o backend estará disponível em http://localhost:8080.

### Configuração do Front-end

1. Navegue até a pasta do front-end e instale dependências: `npm install`

2. Execute o front-end: `npm run dev`

3. Abra o navegador em http://localhost:5173/register para se cadastrar, depois do registro feito você será redirecionado para rota "/login", faça login e explore a aplicação!

### Uso da Aplicação

1. **Registre uma conta** ou faça login.
2. **Crie, atualize e delete tarefas**; cada tarefa pertence ao usuário logado.
3. **Tarefas são persistidas** no banco até serem removidas.
4. **Rotas protegidas** exigem autenticação JWT.
5. Explore e teste todos os endpoints via **Swagger/OpenAPI**:  
   [Acesse o Swagger](http://localhost:8080/swagger-ui.html)

