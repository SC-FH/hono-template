import type { Context } from 'hono'

export type Result<T = undefined> = {
    code: number
    data?: T
    message: string
}

export function result<T>(ctx: Context, data?: T) {
    const result: Result<T> = {
        code: 200,
        data,
        message: 'success'
    }
    return ctx.json(result)
}