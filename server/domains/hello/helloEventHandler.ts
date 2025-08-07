import type { EventHandlerFn } from '~~/server/core/requests/requestToEventHandler';

export const helloEventHandlerFn: EventHandlerFn<HelloRequest> = async ({
  body,
}) => {
  return {
    message: `Hello ${body.name ?? ''}, it's ${new Date()}`,
  };
};
