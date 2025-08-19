export default defineEventHandler(new EventHandlerBuilder<IndexAuditLogsRequest>().query(IndexAuditLogsRequestQuerySchema).handle(IndexAuditLogsEventHandlerFn));
