declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: number;
      ACCESS_TOKEN_SECRET_KEY: string;
      ACCESS_TOKEN_EXPIRES_IN: string;
      REFRESH_TOKEN_SECRET_KEY: string;
      REFRESH_TOKEN_EXPIRES_IN: string;
      REDIS_HOST: string;
      REDIS_PORT: number;
    }
  }
}

export {};
