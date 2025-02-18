# 📌 School Backend - Documentação

## 📖 Sobre o Projeto
Este é o backend do sistema escolar, responsável pela gestão de alunos, professores, notas, turmas e usuários. Ele fornece uma API REST para interação com o frontend e faz uso do banco de dados via Prisma ORM.

## 🚀 Tecnologias Utilizadas
- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework para APIs
- **Prisma ORM** - Gerenciamento do banco de dados
- **PostgreSQL** - Banco de dados utilizado
- **JWT (JSON Web Token)** - Autenticação de usuários
- **bcrypt** - Criptografia de senhas

---

## 📥 Instalação

### 1️⃣ Clonar o Repositório
```sh
$ git clone https://github.com/seu-usuario/seu-repositorio.git
$ cd seu-repositorio
```

### 2️⃣ Instalar Dependências
```sh
$ npm install
```

---

## 🛠️ Configuração do Banco de Dados

### 3️⃣ Criar um Arquivo **.env**
No diretório raiz do projeto, crie um arquivo **.env** e configure as variáveis:

```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
JWT_SECRET="sua_chave_secreta"
PORT=5000
```

📌 **Observação**: Altere `usuario`, `senha` e `nome_do_banco` conforme sua configuração.

### 4️⃣ Criar o Banco de Dados
Se o banco ainda não existir, crie-o manualmente no PostgreSQL ou execute:
```sh
$ npx prisma db push
```

### 5️⃣ Executar Migrações
```sh
$ npx prisma migrate dev --name init
```

### 6️⃣ Popular o Banco com Dados Iniciais (Opcional)
```sh
$ npx prisma db seed
```

---

## ▶️ Executando o Servidor

### 7️⃣ Modo Desenvolvimento
```sh
$ npm run dev
```

### 8️⃣ Modo Produção
```sh
$ npm start
```

O servidor rodará na porta definida no `.env` (padrão: **5000**). A API estará acessível em:
```
http://localhost:5000/api
```

---

## 🛠️ Comandos Adicionais

### 📌 Rodar Prisma Studio (Interface Visual do Banco)
```sh
$ npx prisma studio
```

### 📌 Atualizar o Banco Após Mudanças no Schema
```sh
$ npx prisma migrate dev --name update
```

### 📌 Redefinir Banco e Aplicar Migrações (Usar com Cuidado!)
```sh
$ npx prisma migrate reset
```

---

## 🔄 Estrutura do Projeto

```
/
├── src/
│   ├── controllers/    # Controladores das rotas
│   ├── middlewares/    # Middlewares de autenticação e validação
│   ├── models/         # Modelos e interfaces
│   ├── routes/         # Rotas da API
│   ├── services/       # Regras de negócio
│   ├── prisma/         # Configuração do banco
│   ├── app.ts          # Configuração principal
│   ├── server.ts       # Inicialização do servidor
├── prisma/
│   ├── schema.prisma   # Definição do banco Prisma
├── .env                # Configuração de variáveis ambiente
├── package.json        # Dependências e scripts
└── README.md           # Documentação do projeto
```

---

## 🔒 Autenticação
Todas as rotas protegidas exigem um **JWT Token**. Para obter um token, faça login:

**Requisição:**
```http
POST /api/auth/login
```
```json
{
  "email": "admin@school.com",
  "password": "admin123"
}
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUz..."
}
```

Use esse token no cabeçalho das requisições:
```http
Authorization: Bearer SEU_TOKEN
```

---

## 📬 Contato
Dúvidas ou sugestões? Entre em contato:
📧 **mateussilva651@gmail.com**

