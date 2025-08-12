export default defineEventHandler(new EventHandlerBuilder<IndexServiceRequest>().query(IndexServiceRequestQuerySchema).handle(IndexServiceEventHandlerFn));
