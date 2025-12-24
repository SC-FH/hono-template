import { zValidator } from '@hono/zod-validator'
import type { ValidationTargets } from 'hono'
import type { ZodType } from 'zod'

// 封装一个通用的校验器

export function validator<Target extends keyof ValidationTargets, T extends ZodType>(target: Target, schema: T) {
    return zValidator(target, schema, (result, c) => {
        if (!result.success) {
            return c.json({
                code: 400,
                msg: '参数校验未通过',
                detail: result.error.issues.map(i => ({
                    path: i.path.join('.'),
                    message: i.message
                })),
            }, 400)
        }
    })
}