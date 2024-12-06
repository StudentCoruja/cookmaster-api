# Boas-vindas ao repositório do projeto Cookmaster API

O Projeto Cookmaster API é uma aplicação back-end que permite aos usuários compartilhar e explorar receitas culinárias. O projeto utiliza Node.js com MySQL para gerenciar dados de usuários, receitas e categorias. Este projeto foi desenvolvido com foco didático, permitindo o aprendizado de práticas de desenvolvimento seguro, organização em camadas e implementação de autenticação e autorização.

## Recursos da API

### Funcionalidades Principais

1. **Cadastro e autenticação de usuários**:

- Registro de usuários com diferentes níveis de permissão (user, manager, admin).
- Login com autenticação via JWT.

2. **Gerenciamento de receitas**:

- Criação, leitura, atualização e exclusão de receitas.
- Controle de permissões:
  - Somente o criador da receita ou usuários com papéis de manager ou admin podem editá-las ou excluí-las.

3. **Categorias de receitas**:

- Organização de receitas em categorias específicas.
- Relacionamento entre receitas e categorias.

4. **Relacionamento entre receitas e categorias**:

- Associar uma receita a múltiplas categorias.
- Listar receitas de uma categoria específica.

## Tecnologias Utilizadas

### Back-end

- [Node.js](https://nodejs.org/pt)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [JWT (JSON Web Token)](https://jwt.io/introduction) para autenticação.
- [Bcrypt.js](https://www.npmjs.com/package/bcrypt) para hashing de senhas.

### Outras Ferramentas

- [Docker](https://www.docker.com/) para criação de ambientes de desenvolvimento consistentes.
- [ESLint](https://eslint.org/) para manter o código limpo e padronizado.

## Estrutura do Banco de Dados

A aplicação utiliza quatro tabelas principais:

1. **users**:

- Armazena informações dos usuários, incluindo suas permissões (roles).

2. **recipes**:

- Armazena receitas e suas informações detalhadas.
- Relacionada à tabela `users`.

3. **categories**:

- Armazena as categorias das receitas.

4. **recipes_categories**:

- Relaciona receitas com categorias.

## Endpoints Disponíveis

### Users

- `GET /users`: Lista todos os usuários (restrições de permissão aplicadas).
- `GET /users/:id`: Retorna informações de um usuário específico (restrições de permissão aplicadas).
- `POST /users`: Cria um novo usuário.
- `PUT /users/:id`: Atualiza informações de um usuário (restrições de permissão aplicadas).
- `DELETE /users/:id`: Exclui um usuário (restrições de permissão aplicadas).

### Recipes

- `GET /recipes`: Lista todas as receitas.
- `GET /recipes/:id`: Retorna os detalhes de uma receita.
- `POST /recipes`: Cria uma nova receita.
- `PUT /recipes/:id`: Atualiza uma receita (restrições de permissão aplicadas).
- `DELETE /recipes/:id`: Exclui uma receita (restrições de permissão aplicadas).

### Categories

- `GET /categories`: Lista todas as categorias.
- `GET /categories/:id`: Retorna os detalhes de uma categoria.
- `POST /categories`: Cria uma nova categoria.
- `PUT /categories/:id`: Atualiza uma categoria (restrições de permissão aplicadas).
- `DELETE /categories/:id`: Exclui uma categoria (restrições de permissão aplicadas).

### Autenticação

- `POST /login`: Autentica o usuário e retorna um token JWT. (A ser feito)
