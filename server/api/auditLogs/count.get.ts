export default defineEventHandler(new EventHandlerBuilder<CountAuditLogsRequest>().query(CountAuditLogsRequestQuerySchema).handle(CountAuditLogsEventHandlerFn));
