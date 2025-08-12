export default defineEventHandler(new EventHandlerBuilder<ShowPhotoRequest>().params(ShowPhotoRequestParamsSchema).handle(ShowPhotoEventHandlerFn));
