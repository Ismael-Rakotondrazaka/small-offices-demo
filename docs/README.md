# Small Offices Demo - Documentation

Welcome to the Small Offices Demo project documentation. This project is built with **Nuxt 4**, **Vue 3**, **TypeScript**, **Prisma**, and **Naive UI**.

## 📚 Documentation Topics

### 1. [Database Models & Prisma](./database-models/README.md)
Learn how to define models in the Prisma schema and understand the database structure.

### 2. [Code Generation](./code-generation/README.md)
Comprehensive guide to the custom CLI tool that generates API files, DTOs, and server components from Prisma models.

### 3. [Form Handling](./form-handling/README.md)
Learn how to implement forms using Naive UI components with VeeValidate for validation.

## 🏗️ Project Structure

```
small-offices-demo/
├── app/                    # Nuxt frontend application
│   ├── components/         # Vue components
│   ├── pages/             # Page components
│   ├── composables/       # Vue composables
│   └── stores/            # Pinia stores
├── server/                # Nuxt server-side code
│   ├── api/               # API routes
│   ├── domains/           # Business logic domains
│   └── services/          # Services (Prisma, etc.)
├── shared/                # Shared types and schemas
├── scripts/               # Custom CLI tools
└── docs/                  # This documentation
```

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up the database:**
   ```bash
   pnpm db:push
   pnpm db:seed
   ```

3. **Start the development server:**
   ```bash
   pnpm dev
   ```

## 🛠️ Key Technologies

- **Frontend:** Nuxt 4, Vue 3, TypeScript, Naive UI, Tailwind CSS
- **Backend:** Nuxt Server Routes, Prisma ORM
- **Validation:** VeeValidate, Zod
- **State Management:** Pinia
- **Code Generation:** Custom CLI with ts-morph

## 📖 Getting Started

1. Read the [Database Models](./database-models/README.md) documentation to understand the data structure
2. Explore the [Code Generation](./code-generation/README.md) guide to learn how to generate new API endpoints
3. Check the [Form Handling](./form-handling/README.md) documentation for building user interfaces

## 🤝 Contributing

When adding new features:

1. Define your models in `server/services/prisma/schema.prisma`
2. Run the generate command to create API files
3. Implement your business logic in the generated domain files
4. Create your UI components using the form handling patterns

For detailed information on each topic, please refer to the specific documentation sections above. 