# Code Generation CLI

This section covers the custom CLI tool that automatically generates API files, DTOs, and server components from Prisma models.

## 📋 Table of Contents

- [Overview](#overview)
- [CLI Structure](#cli-structure)
- [Generate Command](#generate-command)
- [Generated Files](#generated-files)
- [Post Model Example](#post-model-example)
- [Customization](#customization)
- [Best Practices](#best-practices)

## 🔍 Overview

The project includes a custom CLI tool located in `scripts/` that automatically generates:

- **API Routes** - Nuxt server routes for CRUD operations
- **DTOs** - Data Transfer Objects with Zod validation schemas
- **Request Types** - TypeScript interfaces for API requests
- **Server Components** - Models, repositories, and DTO mappers
- **Event Handlers** - Business logic handlers for API operations

## 🏗️ CLI Structure

```
scripts/
├── bin/
│   └── cli.ts              # CLI entry point
├── src/
│   ├── index.ts            # Main CLI program
│   ├── generate/
│   │   ├── action.ts       # Generate command implementation
│   │   ├── generators/     # File generators
│   │   └── utils/          # Generation utilities
│   └── utils/              # Shared utilities
└── tsconfig.json
```

### Entry Point

```typescript
// scripts/bin/cli.ts
#!/usr/bin/env node
import '../src/index';
```

### Main Program

```typescript
// scripts/src/index.ts
import { Command } from 'commander';
import { action as generateAction } from './generate/action';

const program = new Command();

program
  .name('prisma-scaffold')
  .description('CLI to scaffold Nuxt API files from Prisma models')
  .version('1.0.0');

program
  .command('generate')
  .description('Generate API files for Prisma models')
  .option('-s, --schema <schema>', 'Prisma schema file path')
  .option('-m, --models <models...>', 'Specific models to generate')
  .option('-e, --exclude <models...>', 'Models to exclude')
  .option('--skip-dto', 'Skip DTO generation')
  .option('--skip-requests', 'Skip request files generation')
  .option('--skip-config', 'Skip config file generation')
  .option('--skip-server', 'Skip server domain files generation')
  .option('--skip-event-handlers', 'Skip event handler files generation')
  .option('--skip-api', 'Skip API route files generation')
  .action(generateAction);
```

## 🚀 Generate Command

### Basic Usage

```bash
# Generate files for all models
pnpm run generate

# Generate files for specific models
pnpm run generate --models Post User

# Exclude specific models
pnpm run generate --exclude AuthAccess

# Skip specific file types
pnpm run generate --skip-dto --skip-requests
```

### Command Options

| Option                  | Description                         | Default                |
| ----------------------- | ----------------------------------- | ---------------------- |
| `-s, --schema`          | Prisma schema file path             | `prisma/schema.prisma` |
| `-m, --models`          | Specific models to generate         | All models             |
| `-e, --exclude`         | Models to exclude                   | None                   |
| `--skip-dto`            | Skip DTO generation                 | false                  |
| `--skip-requests`       | Skip request files generation       | false                  |
| `--skip-config`         | Skip config file generation         | false                  |
| `--skip-server`         | Skip server domain files generation | false                  |
| `--skip-event-handlers` | Skip event handler files generation | false                  |
| `--skip-api`            | Skip API route files generation     | false                  |

## 📁 Generated Files

For each model, the CLI generates files in multiple directories:

### Shared Domain Files (`shared/domains/{model}/`)

```
shared/domains/posts/
├── index.ts              # Barrel exports
├── postConfig.ts         # Model configuration
├── postDTO.ts           # Data Transfer Object
├── storePostRequest.ts  # Create request
├── updatePostRequest.ts # Update request
├── showPostRequest.ts   # Show request
├── destroyPostRequest.ts # Delete request
└── indexPostRequest.ts  # List request
```

### Server Domain Files (`server/domains/{model}/`)

```
server/domains/posts/
├── index.ts              # Barrel exports
├── postModel.ts          # Extended model interface
├── postRepository.ts     # Database operations
├── postDTOMapper.ts      # DTO mapping logic
├── storePostEventHandlerFn.ts
├── updatePostEventHandlerFn.ts
├── showPostEventHandlerFn.ts
├── destroyPostEventHandlerFn.ts
└── indexPostEventHandlerFn.ts
```

### API Route Files (`server/api/{model}/`)

```
server/api/posts/
├── index.get.ts          # List posts
├── index.post.ts         # Create post
├── [id]/
│   ├── index.get.ts      # Show post
│   ├── index.put.ts      # Update post
│   └── index.destroy.ts  # Delete post
```

## 📝 Post Model Example

Let's examine how the **Post** model generates its files:

### 1. Prisma Schema Definition

```prisma
// server/services/prisma/schema.prisma
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

### 2. Generated DTO

```typescript
// shared/domains/posts/postDTO.ts
export interface PostDTO {
  author: UserDTO;
  content: string;
  createdAt: Date;
  deletedAt: Date | null;
  id: string;
  image: MediaDTO | null;
  updatedAt: Date;
}

export const PostSchema = z.object({
  content: z.string(),
  createdAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
  id: z.string(),
  updatedAt: z.coerce.date(),
});
```

### 3. Generated Request Types

```typescript
// shared/domains/posts/storePostRequest.ts
export interface StorePostRequestBody {
  content: string;
  imageId?: string | null;
}

export const StorePostRequestBodySchema = z.object({
  content: z.string(),
  imageId: z.string().nullable().optional(),
});
```

### 4. Generated Server Model

```typescript
// server/domains/posts/postModel.ts
export interface PostModel extends Post {
  author: UserModel;
  image: MediaBaseModel | null;
}
```

### 5. Generated Repository

```typescript
// server/domains/posts/postRepository.ts
export class PostRepository {
  #prismaClient: ExtendedPrismaClient;

  constructor(prismaClient: ExtendedPrismaClient) {
    this.#prismaClient = prismaClient;
  }

  async findMany(options?: FindManyOptions): Promise<PostModel[]> {
    // Implementation...
  }

  async findUnique(id: string): Promise<PostModel | null> {
    // Implementation...
  }

  async create(data: CreatePostData): Promise<PostModel> {
    // Implementation...
  }

  async update(id: string, data: UpdatePostData): Promise<PostModel> {
    // Implementation...
  }

  async delete(id: string): Promise<PostModel> {
    // Implementation...
  }
}
```

### 6. Generated Event Handler

```typescript
// server/domains/posts/storePostEventHandlerFn.ts
export const storePostEventHandlerFn: EventHandlerFn<
  StorePostRequestBody,
  PostDTO
> = async (event) => {
  const { body, user } = event;
  
  const postRepository = new PostRepository(prismaClient);
  const post = await postRepository.create({
    ...body,
    authorId: user.id,
  });

  return PostDTOMapper.toDTO(post);
};
```

### 7. Generated API Route

```typescript
// server/api/posts/index.post.ts
import { requestToEventHandler } from '~~/server/core/requests/requestToEventHandler';
import { storePostEventHandlerFn } from '~~/server/domains/posts/storePostEventHandlerFn';

export default requestToEventHandler(storePostEventHandlerFn);
```

## 🔧 Generation Process

### 1. Schema Parsing

The CLI uses `@loancrate/prisma-schema-parser` to parse the Prisma schema:

```typescript
// scripts/src/generate/action.ts
const schemaContent = fs.readFileSync(prismaSchemaPath, 'utf-8');
const schema = parsePrismaSchema(schemaContent);

const models = getModels(schema);
const enums = getEnums(schema);
```

### 2. File Generation

For each model, the CLI runs multiple generators:

```typescript
// scripts/src/generate/generators/generateFilesForModel.ts
await Promise.all([
  generateConfigFile(model, project, addToSharedExports),
  generateDto(model, project, addToSharedExports),
  generateRequestFiles(model, project, addToSharedExports),
  generateServerFiles(model, project, addToServerExports),
  generateEventHandlers(model, project, addToServerExports),
  generateApiFiles(model, project),
]);
```

### 3. Barrel File Updates

The CLI automatically updates barrel files for clean imports:

```typescript
// Updates shared/domains/posts/index.ts
updateBarrelFile(project, domainPath, [
  './postConfig',
  './postDTO',
  './storePostRequest',
  // ... other exports
]);

// Updates shared/domains/index.ts
updateBarrelFile(project, indexPath, ['./posts']);

// Updates shared/index.ts
updateBarrelFile(project, sharedIndexPath, ['./domains']);
```

## 🎯 Customization

### Custom Generators

You can create custom generators by adding new files to `scripts/src/generate/generators/`:

```typescript
// scripts/src/generate/generators/generateCustomFile.ts
export const generateCustomFile = async (
  model: ParsedModel,
  project: Project,
  addToExports: (exportName: string) => void,
): Promise<boolean> => {
  // Your custom generation logic
  return true;
};
```

### Template Customization

The generators use **ts-morph** for code generation. You can customize templates by modifying the generator files.

## 🚀 Best Practices

### 1. Model Naming

- Use **PascalCase** for model names
- Use descriptive names that reflect the business domain
- Keep names singular (e.g., `Post`, not `Posts`)

### 2. Field Design

- Include standard fields (`id`, `createdAt`, `updatedAt`, `deletedAt`)
- Use appropriate field types and constraints
- Define relationships clearly

### 3. Generation Workflow

1. **Define your model** in `schema.prisma`
2. **Run the generate command** to create files
3. **Review generated files** and customize as needed
4. **Implement business logic** in event handlers
5. **Test your API endpoints**

### 4. File Organization

- Keep generated files in their designated directories
- Don't manually edit generated files (they will be overwritten)
- Extend functionality through separate files

## 🔗 Related Documentation

- [Database Models](./../database-models/README.md) - Learn about Prisma schema design
- [Form Handling](./../form-handling/README.md) - See how generated types are used in forms

## 🛠️ Troubleshooting

### Common Issues

1. **Schema not found**: Ensure `schema.prisma` exists in the correct path
2. **Generation errors**: Check for syntax errors in your Prisma schema
3. **Missing files**: Verify all required dependencies are installed

### Debug Mode

Add logging to see what's happening during generation:

```typescript
// scripts/src/generate/action.ts
logger.info(`Processing model: ${model.name}`);
logger.info(`Generated files: ${generatedFiles.join(', ')}`);
```

## 📚 External Resources

- [ts-morph Documentation](https://ts-morph.com/)
- [Commander.js Documentation](https://github.com/tj/commander.js)
- [Prisma Schema Parser](https://github.com/loancrate/prisma-schema-parser) 