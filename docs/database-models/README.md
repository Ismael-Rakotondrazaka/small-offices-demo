# Database Models & Prisma Schema

This section covers how to define and work with database models using Prisma in the Small Offices Demo project.

## 📋 Table of Contents

- [Overview](#overview)
- [Schema Structure](#schema-structure)
- [Model Definitions](#model-definitions)
- [Relationships](#relationships)
- [Enums](#enums)
- [Generated Types](#generated-types)
- [Best Practices](#best-practices)

## 🔍 Overview

The project uses **Prisma ORM** for database management with PostgreSQL. The schema is defined in `server/services/prisma/schema.prisma` and automatically generates TypeScript types and a Prisma client.

## 🏗️ Schema Structure

### Prisma Configuration

```prisma
// server/services/prisma/schema.prisma

generator client {
  output                 = "../../../generated/prisma"
  provider               = "prisma-client"
  runtime                = "nodejs"
  moduleFormat           = "esm"
  generatedFileExtension = "ts"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

**Key Points:**
- Generated client is output to `generated/prisma/` directory
- Uses ESM module format for better tree-shaking
- Supports both `DATABASE_URL` and `DIRECT_URL` for different connection scenarios

## 📊 Model Definitions

### Basic Model Structure

Every model in the project follows a consistent pattern:

```prisma
model ModelName {
  id        String    @id @default(uuid())
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
  
  // Model-specific fields...
}
```

### Example: Post Model

```prisma
model Post {
  id        String    @id @default(uuid())
  content   String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
  authorId  String
  author    User      @relation(fields: [authorId], references: [id])
  imageId   String?
  image     Media?    @relation(fields: [imageId], references: [id])
}
```

**Standard Fields:**
- `id`: Unique identifier using UUID
- `createdAt`: Timestamp when record was created
- `updatedAt`: Timestamp when record was last updated
- `deletedAt`: Soft delete timestamp (nullable)

## 🔗 Relationships

### One-to-Many Relationships

```prisma
model User {
  id    String @id @default(uuid())
  posts Post[]
}

model Post {
  id       String @id @default(uuid())
  authorId String
  author   User   @relation(fields: [authorId], references: [id])
}
```

### Many-to-Many Relationships

```prisma
model User {
  id      String @id @default(uuid())
  medias  Media[]
}

model Media {
  id       String @id @default(uuid())
  authorId String
  author   User   @relation(fields: [authorId], references: [id])
}
```

### One-to-One Relationships

```prisma
model User {
  id      String @id @default(uuid())
  imageId String? @unique
  image   Media? @relation(name: "MediaUserProfileImage", fields: [imageId], references: [id])
}

model Media {
  id         String @id @default(uuid())
  profiledBy User?  @relation("MediaUserProfileImage")
}
```

## 📝 Enums

### Defining Enums

```prisma
enum MediaType {
  IMAGE
  VIDEO
  AUDIO
  DOCUMENT
  OTHER
}

enum AuthProvider {
  CREDENTIALS
  FACEBOOK
}
```

### Using Enums in Models

```prisma
model Media {
  id   String    @id @default(uuid())
  type MediaType
  // ... other fields
}

model AuthAccess {
  id         String       @id @default(uuid())
  provider   AuthProvider
  // ... other fields
}
```

## 🔧 Generated Types

### Prisma Client Types

When you run `pnpm db:generate`, Prisma creates TypeScript types in `generated/prisma/client`:

```typescript
// Generated types for Post model
export type Post = {
  id: string
  content: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  authorId: string
  imageId: string | null
}

// Generated types for MediaType enum
export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  DOCUMENT = 'DOCUMENT',
  OTHER = 'OTHER'
}
```

### Model Extensions

The project extends generated types with additional interfaces:

```typescript
// server/domains/posts/postModel.ts
export interface PostModel extends Post {
  author: UserModel;
  image: MediaBaseModel | null;
}
```

## 🎯 Best Practices

### 1. Naming Conventions

- Use **PascalCase** for model names: `User`, `Post`, `Media`
- Use **camelCase** for field names: `firstName`, `createdAt`
- Use **SCREAMING_SNAKE_CASE** for enum values: `IMAGE`, `CREDENTIALS`

### 2. Field Types

- Use `String` for text fields
- Use `Int` for whole numbers
- Use `Float` for decimal numbers
- Use `Boolean` for true/false values
- Use `DateTime` for timestamps
- Use `Json` for complex data structures

### 3. Relationships

- Always define both sides of relationships
- Use meaningful relation names for complex relationships
- Add indexes for foreign key fields when needed

### 4. Soft Deletes

- Include `deletedAt DateTime?` for soft delete capability
- Use `@deletedAt` field to mark records as deleted without removing them

### 5. Validation

- Use `@unique` for unique constraints
- Use `@default()` for default values
- Use `@db.Text` for large text fields

## 🚀 Database Operations

### Generate Prisma Client

```bash
pnpm db:generate
```

### Push Schema Changes

```bash
pnpm db:push
```

### Run Migrations

```bash
pnpm db:migrate
```

### Seed Database

```bash
pnpm db:seed
```

## 📚 Related Documentation

- [Code Generation](./../code-generation/README.md) - Learn how models are used to generate API files
- [Form Handling](./../form-handling/README.md) - See how models are used in forms

## 🔗 External Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) 