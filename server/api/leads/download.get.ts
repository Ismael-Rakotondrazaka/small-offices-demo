export default defineEventHandler(new EventHandlerBuilder<DownloadLeadsRequest>().query(DownloadLeadsRequestQuerySchema).handle(DownloadLeadsEventHandlerFn));
