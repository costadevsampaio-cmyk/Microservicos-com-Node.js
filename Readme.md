# Microserviços com Node.js

Projeto desenvolvido utilizando arquitetura de microserviços com Node.js, TypeScript, Fastify e Docker.

---

# Tecnologias Utilizadas

- Node.js
- TypeScript
- Fastify
- Docker
- Docker Compose

---

# Arquitetura

O sistema é composto por 3 microserviços:

- API Gateway
- Product Service
- Order Service

---

# Estrutura do Projeto

```bash
Microservicos-com-Node.js
│
├── docker-compose.yml
│
├── apps
│   ├── api-gateway
│   ├── order-service
│   └── product-service
│
├── package.json
└── tsconfig.json
```

---

# Funcionamento dos Serviços

## Product Service

Responsável por fornecer os produtos da aplicação.

Porta:

```bash
3001
```

Endpoint:

```http
GET /products
```

---

## Order Service

Responsável por criar pedidos.

Esse serviço se comunica internamente com o Product Service para validar produtos e calcular o valor total do pedido.

Porta:

```bash
3002
```

Endpoint:

```http
POST /orders
```

---

## API Gateway

Responsável por centralizar todas as requisições da aplicação.

Porta:

```bash
3000
```

Endpoints:

```http
GET /products
POST /orders
```

---

# Fluxo da Arquitetura

## Buscar Produtos

```text
Cliente
   │
   ▼
API Gateway
   │
   ▼
Product Service
```

---

## Criar Pedido

```text
Cliente
   │
   ▼
API Gateway
   │
   ▼
Order Service
   │
   ▼
Product Service
```

---

# Comunicação entre Serviços

Os serviços se comunicam via HTTP utilizando a rede interna criada automaticamente pelo Docker Compose.

Exemplo:

```bash
http://product-service:3001
```

---

# Como Executar o Projeto

## 1. Clonar o repositório

```bash
git clone https://github.com/costadevsampaio-cmyk/Microservicos-com-Node.js.git
```

---

## 2. Entrar no projeto

```bash
cd Microservicos-com-Node.js
```

---

## 3. Instalar dependências

```bash
npm install
```

---

# Executando com Docker

## Subir containers

```bash
docker compose up --build
```

---

## Parar containers

```bash
docker compose down
```

---

# Testando os Serviços

## Product Service

```http
GET http://localhost:3001/products
```

---

## Order Service

```http
POST http://localhost:3002/orders
```

Body:

```json
{
  "productId": 1,
  "quantity": 2
}
```

---

## API Gateway

### Produtos

```http
GET http://localhost:3000/products
```

### Pedidos

```http
POST http://localhost:3000/orders
```

---

# Conceitos Aplicados

- Monorepo
- Microservices
- API Gateway Pattern
- HTTP Communication
- Docker Networking
- Containerização
- Multi-stage Docker Build

---

# Autor

Vinicius Sampaio Costa
João Arthur 