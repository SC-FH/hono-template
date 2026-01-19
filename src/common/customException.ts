import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

export class CustomException extends HTTPException {
    constructor(message: string, code: ContentfulStatusCode = 400) {
        super(code, { message })
    }
}