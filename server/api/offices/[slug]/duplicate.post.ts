export default defineEventHandler(new EventHandlerBuilder<DuplicateOfficeRequest>().params(DuplicateOfficeParamsSchema).handle(DuplicateOfficeEventHandlerFn));
