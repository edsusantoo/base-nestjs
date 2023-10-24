## Description

[Nest](https://github.com/nestjs/nest) baseframework TypeScript starter repository and base project.

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
