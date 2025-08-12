export default defineEventHandler(new EventHandlerBuilder<DestroyOfficeRequest>().params(DestroyOfficeRequestParamsSchema).handle(DestroyOfficeEventHandlerFn));
