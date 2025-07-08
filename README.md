# Auth Microservice (NestJS + Prisma)

A production-grade, modular NestJS microservice with PostgreSQL (via Prisma), global logging, translation, configuration, authentication middleware, Swagger documentation, and robust error/response handling.

---

## Features
- **NestJS** modular structure
- **Prisma** ORM with PostgreSQL
- **Global Logging** (Winston)
- **Global Exception Filter**
- **Global Response Interceptor** (translation, consistent structure)
- **Language/Translation** support
- **Authentication Middleware**
- **Swagger API Docs**
- **Environment-based config**

---

## Project Structure
```
src/
  app.module.ts
  main.ts
  prisma/              # PrismaService & PrismaModule
  modules/             # Feature modules (e.g., dummy)
  common/              # Shared interceptors, filters, utils, etc.
  config/              # ConfigService
  translations/        # Translation files (en.json, etc.)
```

---

## Prerequisites
- Node.js v18+
- npm v9+
- PostgreSQL database

---

## Setup Guide

### 1. **Clone the Repository**
```bash
git clone <repo-url>
cd micro-services/auth-ms
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Configure Environment**
- Copy `.env.example` to `.env` and update values:
  ```env
  DATABASE_URL=postgresql://user:password@localhost:5432/dbname
  PORT=9090
  # ...other config
  ```

### 4. **Prisma Setup**
- **Generate Prisma Client:**
  ```bash
  npx prisma generate
  ```
- **Run Migrations:**
  ```bash
  npx prisma migrate dev --name init
  ```
- **(Optional) Open Prisma Studio:**
  ```bash
  npx prisma studio
  ```

### 5. **Start the Server**
- **Development:**
  ```bash
  npm run start:dev
  ```
- **Production Build:**
  ```bash
  npm run build
  npm run start:prod
  ```

---

## API Documentation
- Swagger UI: [http://localhost:9090/api](http://localhost:9090/api)

---

## Response & Error Handling
- All responses follow:
  ```json
  { "success": true, "data": ..., "message": "..." }
  ```
- All errors follow:
  ```json
  { "success": false, "data": null, "message": "..." }
  ```
- Messages are translated based on the `x-lang` header (default: `en`).

---

## Useful Commands
- **Lint:** `npm run lint`
- **Test:** `npm run test`
- **Prisma Generate:** `npx prisma generate`
- **Prisma Migrate:** `npx prisma migrate dev --name <name>`

---

## Extending the Project
- Add new modules in `src/modules/`
- Add new translations in `src/translations/`
- Add new shared logic in `src/common/`

---

## License
MIT
