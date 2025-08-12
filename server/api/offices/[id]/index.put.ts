export default defineEventHandler(new EventHandlerBuilder<UpdateOfficeRequest>().body(UpdateOfficeRequestBodySchema).params(UpdateOfficeRequestParamsSchema).handle(UpdateOfficeEventHandlerFn));
