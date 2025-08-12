export default defineEventHandler(new EventHandlerBuilder<DestroyServiceRequest>().params(DestroyServiceRequestParamsSchema).handle(DestroyServiceEventHandlerFn));
