import path from 'node:path';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: path.join('server', 'services', 'prisma', 'schema.prisma'),
  typedSql: {
    path: path.join('server', 'services', 'prisma', 'sql'),
  },
});
