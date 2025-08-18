export default defineEventHandler(
  new EventHandlerBuilder()
    .query(CountOfficesRequestQuerySchema)
    .handle(CountOfficesEventHandlerFn),
);
