import { CountLeadsEventHandlerFn } from '~~/server/domains/leads/countLeadsEventHandlerFn';
import { CountLeadsRequestQuerySchema } from '~~/shared/domains/leads/countLeadsRequest';

export default defineEventHandler(
  new EventHandlerBuilder()
    .query(CountLeadsRequestQuerySchema)
    .handle(CountLeadsEventHandlerFn),
);
