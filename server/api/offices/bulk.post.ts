export default defineEventHandler(new EventHandlerBuilder<BulkStoreOfficeRequest>().body(BulkStoreOfficeRequestBodySchema).handle(BulkStoreOfficeEventHandlerFn));
