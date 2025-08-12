export default defineEventHandler(new EventHandlerBuilder<IndexPhotoRequest>().query(IndexPhotoRequestQuerySchema).handle(IndexPhotoEventHandlerFn));
