import * as swaggerUiExpress from 'swagger-ui-express';
import { readFileSync } from 'fs';
import { INestApplication } from '@nestjs/common';

export const configSwagger = (app: INestApplication<any>) => {
  app.use(
    '/doc/api',
    swaggerUiExpress.serve,
    swaggerUiExpress.setup(JSON.parse(readFileSync('./openapi.json', 'utf-8'))),
  );
};
