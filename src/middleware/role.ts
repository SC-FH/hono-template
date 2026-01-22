import { createMiddleware } from 'hono/factory'
import { CustomException } from '../common/customException.js'
import { redis } from '../common/redis.js'
import { db } from '../db/index.js'
import { eq } from 'drizzle-orm'
import * as schema from '../db/schema.js'

export type Role = 'admin' | 'user'

type RoleMiddlewareOptions = {
    /**
     * 是否排除roles中的角色
     */
    isExclude: boolean
}

/**
 * 角色验证中间件
 * @param roles 
 * @param options 
 * @returns 
 */
export const roleMiddleware = (roles: Role[], options: RoleMiddlewareOptions = { isExclude: false }) => {
    return createMiddleware(async (c, next) => {

        const userId = c.get('userId')

        let role: Role

        const redisRole = await redis.get(`role:${userId}`)

        if (redisRole) {
            role = redisRole as Role
        } else {
            const user = await db.query.user.findFirst({
                where: eq(schema.user.id, userId),
            })

            const userRole = user?.role

            if (!userRole) {
                throw new CustomException('未找到用户角色', 400)
            }

            role = userRole

            await redis.set(`role:${userId}`, userRole, { EX: 60 * 60 * 24 })
        }

        const hasAccess = options.isExclude
            ? !roles.includes(role)
            : roles.includes(role);

        if (hasAccess) {
            return next();
        }

        throw new CustomException('无权限访问', 403);
    })
}