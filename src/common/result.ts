import type { Context } from 'hono'
export function result<T>(ctx: Context, data?: T) {
    return ctx.json({
        code: 200,
        data,
        message: 'success'
    })
}