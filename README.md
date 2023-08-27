# Projeto Labook (Backend)

 O Projeto Labook é uma rede social com o objetivo de promover a interação entre os usuários por meio da criação e curtidas em publicações. 
 O backend do Labook é construído com as tecnologias NodeJS, Typescript, Express, SQL e SQLite, utilizando o Knex para a manipulação do banco de dados. Além disso, são aplicadas boas práticas de código, como Programação Orientada a Objetos (POO) e arquitetura em camadas.

![alt text](https://uploaddeimagens.com.br/images/004/589/542/original/projeto-labook.png?1693094665 "Logo Title Text 1")

## Tecnologias
O projeto aborda as seguintes ferramentas:

* NodeJS
* Typescript
* Express
* SQL e SQLite
* Knex
* POO
* Arquitetura em camadas
* Geração de UUID
* Geração de hashes
* Autenticação e autorização
* Roteamento
* Postman

## Caminho das Requisições (Paths)
### Requisições de Usuários:
* /users
### Requisições de Posts/Likes:
* /posts

## Exemplo de Requisições
### Requisições de usuários
```javascript
// request GET /users Retorna todos usuários cadastrados
// headers.authorization = "token jwt"
// body JSON
    {
        "id": "fc4cc69c-7a59-4005-aa96-84e765f1252e",
        "name": "Miguel",
        "email": "miguel@gmail.com",
        "role": "NORMAL",
        "createdAt": "2023-08-26T21:21:08.508Z"
    },
    {
        "id": "bac833fa-abea-41ce-abc4-4aba76ad2a75",
        "name": "Gica",
        "email": "gica@gmail.com",
        "role": "ADMIN",
        "createdAt": "2023-08-26T21:24:26.369Z"
    }

// response
// status 200 OK
{
  token: "um token jwt"
}
```
`POST /users/signup`: Cadastra novo usuario
```javascript
// request GET /users Retorna todos usuários cadastrados
// headers.authorization = "token jwt"
// body JSON
{
    "id":"u005",
    "name": "Ciclano",
    "email": "ciclano@123",
    "password": "1234"
}
```
```
{
    Cadastro realizado com sucesso
}
```

`DELETE /users/:id`: Deleta usuário pela ID.

```
{
    User apagado com sucesso
}
```

### Requisições de produtos
`GET /products`: Retorna todos produtos cadastrados
```javascript
[
    {
        "id": "prod001",
        "name": "Mouse Gamer Wireless Top",
        "price": 250,
        "description": "Melhor mouse do mercado",
        "image_url": "undefined"
    },
    {
        "id": "prod002",
        "name": "Monitor",
        "price": 900,
        "description": "Melhor monitor do mercado",
        "image_url": "https://picsum.photos/seed/Monitor/400"
    },
    {
        "id": "prod003",
        "name": "Teclado games",
        "price": 500,
        "description": "Melhor teclado do mercado",
        "image_url": "https://picsum.photos/seed/Teclado/400"
    }
]
```
`POST /products`: Cadastra novo produto
```javascript
{
    "id":"prod009",
    "name": "Webcam 1080p",
    "price": 279.99,
    "description": "Full hd",
    "imageUrl": "https://picsum.photos/seed/Webcam/400"
}
```
```
{
    Produto cadastrado com sucesso
}
```

`DELETE /products/:id`: Deleta produto pela ID.

```
{
    Produto apagado com sucesso
}
```

`PUT /products/:id`: Edita produto pela ID
```javascript
{
    "name": "Pendrive USB3.0 2023"
}
```
```
{
    Produto atualizado com sucesso
}
```

### Requisições de compras
`GET /purchases/:id`: Retorna compra pelo ID
```javascript
{
    "purchaseId": "pur001",
    "buyerId": "u004",
    "buyerName": "Fulano",
    "buyerEmail": "fulano@123",
    "totalPrice": 6000,
    "createdAt": "2023-07-08 23:31:48",
    "products": [
        {
            "id": "prod001",
            "name": "Mouse Gamer Wireless Top",
            "price": 250,
            "description": "Melhor mouse do mercado",
            "imageUrl": "undefined",
            "quantity": 1
        }
    ]
}
```
`GET /purchases/`: Retorna todas as compras
```javascript
[
    {
        "purchaseId": "pur001",
        "buyerId": "u004",
        "buyerName": "Fulano",
        "buyerEmail": "fulano@123",
        "totalPrice": 6000,
        "createdAt": "2023-07-08 23:31:48"
    },
    {
        "purchaseId": "pur002",
        "buyerId": "u004",
        "buyerName": "Fulano",
        "buyerEmail": "fulano@123",
        "totalPrice": 2500,
        "createdAt": "2023-07-12 21:56:32"
    }
]
```
`POST /purchases`: Cadastra nova compra
```javascript
{
    "id": "pur002",
    "buyer": "u002",
    "products": [
        {
            "id": "prod001",
            "quantity": 1
        },
        {
            "id": "prod003",
            "quantity": 1
        }
    ]
}
```
```
{
    Compra adicionada com sucesso
}
```

`DELETE /purchases/:id`: Deleta compra pelo ID

```
{
    Pedido cancelado com sucesso
}
```
## Documentação do Postman
[Link da API no POSTMAN](https://documenter.getpostman.com/view/26594213/2s93sjT8SX)

# Criado por:
## Miguel Alves
![alt text](https://uploaddeimagens.com.br/images/004/544/373/original/imagem_pq.png?1689299009  "Logo Title Text 1" )

[Linkedin](https://www.linkedin.com/in/miguelbitz/)


