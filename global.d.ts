import 'hono'
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
        }
    }
}

declare module 'hono' {
    interface ContextVariableMap {
        // 定义Hono Context中的自定义存储的变量类型
        userId: number; //当前用户id
        isWS: boolean;  //是否为websocket请求
    }
}

export { }