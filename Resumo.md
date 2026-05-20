Estrutura do Projeto
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
Papel de Cada Serviço
1. Product Service

Diretório:

apps/product-service

Porta:

3001

Responsabilidade:

Gerenciar produtos
Retornar catálogo
Fornecer dados de produtos para outros serviços
O que ele faz

Esse serviço simula uma base de produtos.

Exemplo:

[
  {
    "id": 1,
    "name": "Notebook Pro",
    "price": 3500
  }
]
Endpoint principal
GET /products

Exemplo:

http://localhost:3001/products
2. Order Service

Diretório:

apps/order-service

Porta:

3002

Responsabilidade:

Criar pedidos
Validar produtos
Calcular total da compra
O ponto MAIS importante

O Order Service NÃO possui dados próprios de produtos.

Ele depende do Product Service.

Ou seja:

Order Service
   │
   ▼
Product Service
Como funciona internamente

Quando o cliente envia:

{
  "productId": 1,
  "quantity": 2
}

o Order Service:

1. Recebe o pedido
2. Faz uma requisição HTTP interna

para:

http://product-service:3001/products
3. Busca o produto
4. Valida se existe
5. Calcula:
price * quantity
6. Retorna o pedido enriquecido

Exemplo:

{
  "id": 1,
  "productId": 1,
  "productName": "Notebook Pro",
  "quantity": 2,
  "total": 7000
}
Isso demonstra um conceito MUITO importante
Comunicação entre microserviços

Também chamado de:

Inter-service communication
3. API Gateway

Diretório:

apps/api-gateway

Porta:

3000

Responsabilidade:

Ser o ponto único de entrada da aplicação
O cliente NÃO deveria acessar diretamente:
product-service
order-service

Em arquiteturas reais, o cliente conversa apenas com:

API Gateway
O Gateway funciona como proxy

Fluxo:

Cliente
   │
   ▼
API Gateway
   │
   ├──► Product Service
   │
   └──► Order Service
Exemplo real

Quando você chama:

GET http://localhost:3000/products

o Gateway:

1. Recebe a requisição
2. Encaminha internamente para:
http://product-service:3001/products
3. Recebe a resposta
4. Retorna ao cliente
Isso implementa o padrão:
API Gateway Pattern

Muito utilizado em:

Netflix
Uber
Amazon
iFood
Mercado Livre
Comunicação entre os Containers

Isso é uma das partes mais importantes do projeto.

Docker Compose cria automaticamente:
1. Rede interna

Exemplo:

microservicos-com-nodejs_default
2. DNS interno

Por isso os containers conseguem acessar:

http://product-service:3001

sem precisar de IP manual.

Isso acontece porque o container possui:
container_name: product-service
Comunicação interna real
Order Service → Product Service
http://product-service:3001
API Gateway → Product Service
http://product-service:3001
API Gateway → Order Service
http://order-service:3002
Fluxo completo do sistema
Buscar produtos
Cliente
   │
   ▼
API Gateway (:3000)
   │
   ▼
Product Service (:3001)
Criar pedido
Cliente
   │
   ▼
API Gateway (:3000)
   │
   ▼
Order Service (:3002)
   │
   ▼
Product Service (:3001)
Conceitos arquiteturais implementados

Seu projeto demonstra:

Monorepo

Todos os serviços no mesmo repositório.

Microservices

Cada serviço possui:

responsabilidade própria
porta própria
container próprio
API Gateway

Ponto único de entrada.

HTTP Communication

Serviços conversam via HTTP.

Docker Networking

Containers se comunicam internamente.

Multi-stage Docker Build

Imagens otimizadas para produção.

TypeScript Backend

Tipagem forte e organização melhor.

Por que isso é importante no mercado

Esse tipo de arquitetura:

escala melhor
separa responsabilidades
facilita manutenção
permite deploy independente
isola falhas
Exemplo prático de escalabilidade

Imagine:

muitos pedidos
poucos acessos a produtos

Você poderia subir:

3 containers do order-service

e apenas:

1 container do product-service
Resumo geral

O projeto funciona assim:

Product Service

Fornece dados de produtos.

Order Service

Processa pedidos e depende do Product Service.

API Gateway

Centraliza todas as requisições.

Docker Compose

Orquestra:

containers
rede
comunicação
inicialização dos serviços
Resultado final

Você construiu uma arquitetura backend moderna baseada em:

microsserviços
gateway
containers
comunicação distribuída
monorepo TypeScript
Docker Compose

E isso já se aproxima bastante da estrutura utilizada em aplicações reais de mercado.