import { createMiddleware } from 'hono/factory'
import { CustomException } from '../common/customException.js'

/**
 * 角色验证中间件
 */
export const roleMiddleware = (roles: string[]) => {
    return createMiddleware((c, next) => {

        // const role = c.get('userRole')  //设置context用户角色（JWT层设置），从context中获取用户角色
        const role = 'admin'

        if (roles.includes(role)) {
            return next()
        }

        throw new CustomException(403, '无权限访问')
    })
}