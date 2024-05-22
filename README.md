## Description

[Nest](https://github.com/nestjs/nest) base framework TypeScript starter repository and base project.

## Task List

- [x] Create 2 Connection
- [x] Create Sample Request
- [x] Create Validation Request
- [x] Create Base Response
- [x] Create Auth Service
- [x] Implentation Passport JWT
- [x] Role Base Access Control
- [x] Create Swagger and Config Swagger

## Discontinue
- [ ] Permission Control 

## Tech Stack
- NestJS 10
- Prisma 5
- Postgress (Main Database)
- MongoDB

## Installation

```bash
$ npm install
```

## Prisma Command List
| Prima | Description |
| ----------- | ----------- |
| main | Postgress Connection |
| mongo | Mongodb Connection |
```bash
# for see gui table
$ npm run prisma:main:studio
$ npm run prisma:mongo:studio

# for generate file client or test connection
$ npm run prisma:main:dbpush
$ npm run prisma:mongo:dbpush

# for generate all file client
$ npm run generate:db_clients
```

## Source Learn
- [How to connect Multiple Database using Prisma](https://dulanwirajith.medium.com/how-to-connect-multiple-databases-using-prisma-in-nest-js-e8908529ba38)
- [Config Swagger with swagger-ui-express](https://medium.com/@shyamal.jadav/add-swagger-ui-to-node-js-application-807960509ce6)
