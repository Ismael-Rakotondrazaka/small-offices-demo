import type { Request, RequestToWSMessage } from '~~/shared/requests/request';
import type { Peer } from 'crossws';
import type { EventHandler } from 'h3';

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type EventHandlerFn<R extends Request<any, any, any, any>> = (inputs: {
  body: R['input']['body'];
  params: R['input']['params'];
  path: string;
  query: R['input']['query'];
  setHeaders: (headers: Record<string, string>) => void;
  userSession: {
    get: () => Promise<null | UserSession>;
    require: () => Promise<UserSession>;
  };
}) => R['output'];

export type RequestToEventHandler<R extends Request<any, any, any, any>>
  = EventHandler<
    {
      body: R['input']['body'];
      query: R['input']['query'];
      routerParams: R['input']['params'];
    },
    R['output']
  >;

export type RequestToWSEventHandler<
  TEventName extends string,
  TRequest extends Request<any, any, any, any>,
> = (
  peer: Peer,
  message: RequestToWSMessage<TEventName, TRequest>,
) => Promise<TRequest['output']>;

/* eslint-enable no-unused-vars */
/* eslint-enable @typescript-eslint/no-explicit-any */
