import type { EventHandlerFn } from '~~/server/core/requests/requestToEventHandler';

export const helloEventHandlerFn: EventHandlerFn<HelloRequest> = async ({
  query,
}) => {
  return {
    message: `Hello ${query.name ?? ''}, it's ${new Date()}`,
  };
};
