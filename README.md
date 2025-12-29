# Hono Template Project

**Language:**  
[English](/README.md) | [中文](/docs/languages/zh-CN.md)

---

## Project Overview

> This project is a Node.js web server template built with the **Hono** framework. It integrates commonly used modules to enable rapid development and easy debugging.

## Integrated Features

- **CORS**: Cross-Origin Resource Sharing support
- **JWT**: Authentication mechanism
- **Single Sign-On (SSO)**: Unified identity authentication
- **Role-Based Authorization**: Permission control based on user roles
- **Drizzle ORM**: Database operation toolkit
- **PostgreSQL**: PostgreSQL database support
- **WebSocket**: Real-time communication support
- **Zod**: Data validation to ensure data accuracy

## Development Environment Requirements

- Node.js (LTS version recommended)
- pnpm (package manager)
- PostgreSQL (database)
- Redis (cache or session management)

## Installation & Running

1. Install dependencies:

```bash
pnpm install
```

2. Configure environment variables:

- Copy `.env.development` or `.env.production` to `.env` based on your environment and update the configuration.

3. Start the project:

```bash
pnpm dev
```

## Project Structure Overview

```
src/
├── common/                  # Common utilities or error handling
├── config/                  # Configuration management
├── db/                      # Database configuration and models
├── exceptionHandler/        # Exception handling middleware
├── middleware/              # Custom middleware (JWT, role validation, etc.)
├── routes/                  # Route modules (e.g. user routes)
├── ws/                      # WebSocket module
├── index.ts                 # Application entry point
├── loadEnv.ts               # Environment variable loader
```

## Main Technology Stack

- [Hono](https://honojs.dev): Lightweight and high-performance web framework
- [Drizzle ORM](https://orm.drizzle.team/docs): TypeScript ORM
- [Zod](https://zod.dev): Runtime data validation
- [JWT](https://jwt.io): User authentication and token generation
- PostgreSQL: Database
- Redis: Cache or session storage

## Usage Notes

- All routes are defined in the `src/routes/` directory
- Middleware logic is implemented in `src/middleware/`
- Database operations are defined in `src/db/` using Drizzle ORM
- The application entry point is `src/index.ts`

## Contribution Guide

Issues and Pull Requests are welcome.  
Please ensure your code style is consistent with the project and include necessary documentation updates.

## License

This project is licensed under the MIT License.  
See the [LICENSE](LICENSE) file for details.
