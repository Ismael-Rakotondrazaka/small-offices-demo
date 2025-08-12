export default defineEventHandler(new EventHandlerBuilder<StoreServiceRequest>().body(StoreServiceRequestBodySchema).handle(StoreServiceEventHandlerFn));
