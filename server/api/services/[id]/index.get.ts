export default defineEventHandler(new EventHandlerBuilder<ShowServiceRequest>().params(ShowServiceRequestParamsSchema).handle(ShowServiceEventHandlerFn));
