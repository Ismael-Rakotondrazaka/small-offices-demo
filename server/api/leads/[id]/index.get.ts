export default defineEventHandler(new EventHandlerBuilder<ShowLeadRequest>().params(ShowLeadRequestParamsSchema).handle(ShowLeadEventHandlerFn));
