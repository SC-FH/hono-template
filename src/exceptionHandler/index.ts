import { HTTPException } from 'hono/http-exception'
import { app } from '../index.js'

/**
 * 全局异常处理器
 */
export function initExceptionHandler() {
    app.onError((err, ctx) => {
        if (err instanceof HTTPException) {
            return ctx.json({ code: err.status, message: err.message }, err.status)
        }

        return ctx.json({ message: err.message }, 500)
    })
}