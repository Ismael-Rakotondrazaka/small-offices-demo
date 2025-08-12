export default defineEventHandler(new EventHandlerBuilder<ShowOfficeRequest>().params(ShowOfficeRequestParamsSchema).handle(ShowOfficeEventHandlerFn));
