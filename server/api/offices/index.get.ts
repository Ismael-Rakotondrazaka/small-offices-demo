export default defineEventHandler(new EventHandlerBuilder<IndexOfficeRequest>().query(IndexOfficeRequestQuerySchema).handle(IndexOfficeEventHandlerFn));
