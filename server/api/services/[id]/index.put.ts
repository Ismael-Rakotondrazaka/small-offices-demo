export default defineEventHandler(new EventHandlerBuilder<UpdateServiceRequest>().body(UpdateServiceRequestBodySchema).params(UpdateServiceRequestParamsSchema).handle(UpdateServiceEventHandlerFn));
