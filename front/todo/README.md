Descrição

O TO-DO List é uma aplicação que permite aos usuários organizar suas tarefas do dia a dia. Cada usuário pode criar uma conta, fazer login e gerenciar suas próprias tarefas, que permanecem salvas no banco de dados até serem deletadas.

O projeto também foi desenvolvido para demonstrar habilidades na integração entre frontend e backend, utilizando React no front-end, Spring Boot no back-end, autenticação via JWT e documentação de todos os endpoints com Swagger/OpenAPI.

Funcionalidades

Gerenciamento de tarefas: criar, atualizar, deletar e listar tarefas, com status pendente/concluída.

Autenticação e contas de usuário: registro, login e acesso restrito às próprias tarefas.

Integração frontend ↔ backend:

Front-end em React consumindo API via Fetch API

Back-end em Spring Boot expondo endpoints REST

Atualização em tempo real da interface ao criar, atualizar ou deletar tarefas

Rotas protegidas: acesso com JWT

Documentação da API: todos os endpoints documentados com Swagger/OpenAPI

Acesse a documentação Swagger

Screenshots

Aqui você pode colocar imagens das telas do projeto. Substitua os placeholders pelos arquivos reais (ex.: screenshots/login.png):

Tela de Login

Tela de Edição de Usuário

Tela de Tarefas

💡 Dica: coloque os arquivos de imagem em uma pasta screenshots/ na raiz do projeto para manter o README organizado.

Como Utilizar o Projeto
Pré-requisitos

Java 17

Maven

Node.js (>=18)

PostgreSQL

Configuração do Back-end

Crie um banco PostgreSQL (ex.: todo_db)

Configure conexão no arquivo application.properties:

spring.datasource.url=jdbc:postgresql://localhost:5432/todo_db
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA


Instale dependências e compile o projeto:

mvn clean install


Execute o backend:

mvn spring-boot:run


O backend estará disponível em http://localhost:8080.

Configuração do Front-end

Navegue até a pasta do front-end e instale dependências:

npm install


Execute o front-end:

npm run dev


Abra o navegador em http://localhost:5173 para acessar a aplicação.

Uso da Aplicação

Registre uma conta ou faça login.

Crie, atualize e delete tarefas; cada tarefa pertence ao usuário logado.

Tarefas são persistidas no banco até serem removidas.

Rotas protegidas exigem autenticação JWT.

Explore e teste todos os endpoints via Swagger/OpenAPI:
[SEU_LINK_SWAGGER]

💡 Dica: certifique-se que o backend está rodando antes de interagir com o frontend.

Onde Encontrar Ajuda

Consulte a documentação Swagger para todos os endpoints e exemplos de requisições.

Abra uma issue no repositório para suporte adicional.

Autores

Seu Nome – GitHub
 – LinkedIn
