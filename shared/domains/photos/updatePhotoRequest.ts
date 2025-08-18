import { z } from 'zod';

import type { Request } from '../../../shared/requests/request';
import type { PhotoDTO } from './photoDTO';

import { StringIdentifierSchema } from '../../../shared/schemas/identifierSchema';

export const UpdatePhotoRequestParamsSchema = z.object({ id: StringIdentifierSchema }); ;

export type UpdatePhotoRequestParams = z.infer<typeof UpdatePhotoRequestParamsSchema>;

export const UpdatePhotoRequestBodySchema = z.object({ alt: z.string().nullable().optional(), officeId: z.string().optional(), url: z.string().optional() });

export type UpdatePhotoRequest = Request<UpdatePhotoRequestData, UpdatePhotoRequestBody, UpdatePhotoRequestParams>;
export type UpdatePhotoRequestBody = z.infer<typeof UpdatePhotoRequestBodySchema>;
export type UpdatePhotoRequestData = { data: PhotoDTO };
