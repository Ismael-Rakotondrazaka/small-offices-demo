export default defineEventHandler(new EventHandlerBuilder<DestroyPhotoRequest>().params(DestroyPhotoRequestParamsSchema).handle(DestroyPhotoEventHandlerFn));
