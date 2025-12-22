import pino from 'pino'

export const logger = pino({
    base: null,
    transport: {
        targets: [{
            target: 'pino-pretty', // 或者使用 'pino/file' 配合 destination: 1
            options: {
                colorize: true,
                destination: 1
            } // 1 代表标准输出（控制台）
        }, {
            //带切分的文件日志
            target: 'pino-roll',
            level: 'warn',
            options: {
                file: './logs/app',      // 日志文件基础路径
                frequency: 'daily',      // 切分频率：daily (每天), hourly (每小时)
                size: '10m',             // 或者按大小切分：10m (10MB), 1k (1KB)
                extension: '.log',       // 文件后缀
                mkdir: true,             // 自动创建目录
                dateFormat: 'yyyy-mm-dd', // 文件名中的日期格式
                limit: {
                    count: 8,             // 最多保留 8 个日志文件
                    keepOnlyData: true    // 清理旧日志
                },
            }
        }]
    }
})