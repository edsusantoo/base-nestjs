declare namespace NodeJS {
  export interface ProcessEnv {
    ENVIRONMENT: Environment;
    JWT_SECRET: string;
  }

  export type Environment = 'DEVELOPMENT' | 'PRODUCTION';
}
