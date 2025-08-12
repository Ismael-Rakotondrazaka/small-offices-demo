export default defineEventHandler(new EventHandlerBuilder<DestroyLeadRequest>().params(DestroyLeadRequestParamsSchema).handle(DestroyLeadEventHandlerFn));
