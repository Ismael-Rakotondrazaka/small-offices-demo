export default defineEventHandler(new EventHandlerBuilder<UpdateLeadRequest>().body(UpdateLeadRequestBodySchema).params(UpdateLeadRequestParamsSchema).handle(UpdateLeadEventHandlerFn));
