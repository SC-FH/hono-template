declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            JWT_SECRET: string;
            DATABASE_URL: string;
        }
    }
}

export {}