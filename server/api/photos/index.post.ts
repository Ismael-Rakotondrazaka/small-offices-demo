export default defineEventHandler(new EventHandlerBuilder<StorePhotoRequest>().body(StorePhotoRequestBodySchema).handle(StorePhotoEventHandlerFn));
