declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_PORT: string;
      DATABASE_URL: string;
      DATABASE_USER: string;
      DATABASE_PASSWORD: string;
      DATABASE: string;
      PORT: string;
      ENV: 'test' | 'dev' | 'prod';
      authservice: string;
      jwtSecret: string;
      userservice: string;
    }
  }
}
