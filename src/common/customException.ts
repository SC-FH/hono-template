import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

export class CustomException extends HTTPException {
    constructor(code: ContentfulStatusCode, message: string) {
        super(code, { message })
    }
}