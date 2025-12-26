import { createMiddleware } from 'hono/factory'
import { CustomException } from '../common/customException.js'

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
export const roleMiddleware = (roles: string[], options: RoleMiddlewareOptions = { isExclude: false }) => {
    return createMiddleware((c, next) => {

        // const role = c.get('userRole')  //设置context用户角色（JWT层设置），从context中获取用户角色
        const role = 'admin';

        const hasAccess = options.isExclude
            ? !roles.includes(role)
            : roles.includes(role);

        if (hasAccess) {
            return next();
        }

        throw new CustomException(403, '无权限访问');
    })
}