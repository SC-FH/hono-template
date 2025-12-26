# Hono 模板项目说明

> 本项目是基于 Hono 框架搭建的 Node.js 网络服务器模板，集成了常用功能模块，便于后续快速开发和调试。

## 项目集成特性

- **CORS**：支持跨域请求
- **JWT**：提供认证机制
- **单点登录**：支持统一身份验证
- **角色验证**：基于角色的权限控制
- **Drizzle ORM**：数据库操作工具
- **PostgreSQL**：支持 PostgreSQL 数据库
- **WebSocket**：提供实时通信能力
- **Zod**：数据校验工具，确保数据准确性

## 开发环境依赖

- Node.js (建议使用 LTS 版本)
- pnpm (包管理工具)
- PostgreSQL (数据库环境)
- Redis (可选，用于缓存或会话管理)

## 安装与运行

1. 安装依赖：
   ```bash
   pnpm install
   ```

2. 配置环境变量：
   - 根据开发/生产环境复制 `.env.development` 或 `.env.production` 为 `.env` 并修改配置

3. 启动项目：
   ```bash
   pnpm dev
   ```

## 项目结构概览

```
src/
├── common/                  # 通用工具类或异常处理
├── config/                  # 配置管理
├── db/                      # 数据库相关配置与模型
├── exceptionHandler/        # 异常处理中间件
├── middleware/              # 自定义中间件（JWT、角色验证等）
├── routes/                  # 路由模块（如用户路由）
├── ws/                      # WebSocket 模块
├── index.ts                 # 项目启动入口
├── loadEnv.ts               # 环境变量加载
```

## 主要技术栈

- [Hono](https://honojs.dev)：轻量高性能的 Web 框架
- [Drizzle ORM](https://orm.drizzlelabs.com)：TypeScript ORM 工具
- [Zod](https://zod.dev)：运行时数据校验
- [JWT](https://jwt.io)：用于用户认证与令牌生成
- PostgreSQL：数据库支持
- Redis（可选）：缓存或会话存储

## 使用说明

- 所有路由定义在 `src/routes/` 目录下
- 中间件逻辑在 `src/middleware/` 中实现
- 数据库操作通过 Drizzle ORM 定义在 `src/db/`
- 服务启动入口为 `src/index.ts`

## 贡献指南

欢迎提交 Issue 和 Pull Request。请确保代码风格与项目保持一致，并提供必要的文档更新。

## 许可证

本项目基于 MIT 许可证。详见 [LICENSE](LICENSE) 文件。