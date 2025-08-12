export default defineEventHandler(new EventHandlerBuilder<IndexLeadRequest>().query(IndexLeadRequestQuerySchema).handle(IndexLeadEventHandlerFn));
