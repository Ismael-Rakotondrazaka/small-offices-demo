import { z } from 'zod';

export const Role = { ADMIN: 'ADMIN', EDITOR: 'EDITOR' } as const;

export type Role = (typeof Role)[keyof typeof Role];

export const RoleSchema = z.nativeEnum(Role);
