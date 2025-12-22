type AppConfig = {
    jwt: {
        secret: string
        expired: number
    }
    db: {
        host: string
        port: number
        username: string
        password: string
        database: string
    },
    redis: {
        host: string
        port: number
        username: string
        password: string
    }
    server: {
        port: number
    }
}

const config: { dev: Partial<AppConfig>, prod: Partial<AppConfig> } & Partial<AppConfig> = {
    dev: {
        db: {
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '123456',
            database: 'test'
        },
    },
    prod: {
    },
    jwt: {
        secret: 'secret',
        expired: 60 * 60 * 24,  //过期时间 1 天
    },
    redis: {
        host: 'localhost',
        port: 6379,
        username: 'default',
        password: 'default'
    },
    server: {
        port: 3000
    }
}

export const appConfig = {
    ...{ ...config, dev: undefined, prod: undefined },
    ...(process.env.NODE_ENV === 'production' ? config.prod : config.dev),
} as AppConfig