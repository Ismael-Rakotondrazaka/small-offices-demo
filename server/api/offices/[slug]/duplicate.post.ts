import { DuplicateOfficeEventHandlerFn } from '~~/server/domains/offices/duplicateOfficeEventHandlerFn';
import { DuplicateOfficeParamsSchema } from '~~/shared/domains/offices/duplicateOfficeRequest';
import type { DuplicateOfficeRequest } from '~~/shared/domains/offices/duplicateOfficeRequest';

export default defineEventHandler(new EventHandlerBuilder<DuplicateOfficeRequest>().params(DuplicateOfficeParamsSchema).handle(DuplicateOfficeEventHandlerFn)); 