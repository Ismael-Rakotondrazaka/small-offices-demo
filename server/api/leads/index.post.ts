export default defineEventHandler(new EventHandlerBuilder<StoreLeadRequest>().body(StoreLeadRequestBodySchema).handle(StoreLeadEventHandlerFn));
