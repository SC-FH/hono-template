import { createNodeWebSocket, type NodeWebSocket } from "@hono/node-ws";
import type { WSContext, WSEvents } from "hono/ws";
import { logger } from "../common/logger.js";
import type { Hono } from "hono";

let upgradeWebSocket: NodeWebSocket['upgradeWebSocket']

export function initWS(app: Hono) {
    const { injectWebSocket, upgradeWebSocket: _upgradeWebSocket } = createNodeWebSocket({ app })
    upgradeWebSocket = _upgradeWebSocket
    return { injectWebSocket }
}

/**
 * 
 * @param options 
 * @param heartbeat 是否启用心跳
 * @param [heartbeatCloseTime=1000 * 10] 心跳超时时间
 * @returns 
 */
export function ws(options: WSEvents<WebSocket>, heartbeat = true, heartbeatCloseTime = 1000 * 10) {
    return upgradeWebSocket((c) => {
        let closeTimer: NodeJS.Timeout | null = null;

        const setHeartbeatCloseTimer = (ws: WSContext<WebSocket>) => {
            if (closeTimer) {
                clearTimeout(closeTimer)
            }
            closeTimer = setTimeout(() => {
                ws.close()
            }, heartbeatCloseTime);
        }

        return {
            onOpen(evt, ws) {
                logger.info(`${c.req.path} 用户id: ${c.get('userId')} 已连接WS`)

                if (heartbeat) {
                    setHeartbeatCloseTimer(ws)
                }

                options.onOpen?.(evt, ws)
            },
            onClose(evt, ws) {
                logger.info(`${c.req.path} 用户id: ${c.get('userId')} 已断开WS`)
                options.onClose?.(evt, ws)
            },
            onMessage(evt, ws) {
                if (heartbeat && typeof evt.data === 'string') {
                    const data = JSON.parse(evt.data)
                    if (data.type === 'ping') {
                        ws.send(JSON.stringify({ type: 'pong' }))
                        setHeartbeatCloseTimer(ws)
                        return
                    }
                }
                logger.info(`${c.req.path} 用户id: ${c.get('userId')} 发送消息: ${evt.data}`)
                options.onMessage?.(evt, ws)
            }
        }
    })
}