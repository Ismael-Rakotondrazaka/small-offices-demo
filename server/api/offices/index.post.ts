export default defineEventHandler(new EventHandlerBuilder<StoreOfficeRequest>().body(StoreOfficeRequestBodySchema).handle(StoreOfficeEventHandlerFn));
