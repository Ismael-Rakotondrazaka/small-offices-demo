export default defineEventHandler(new EventHandlerBuilder<UpdatePhotoRequest>().body(UpdatePhotoRequestBodySchema).params(UpdatePhotoRequestParamsSchema).handle(UpdatePhotoEventHandlerFn));
