import type { Request } from '~~/shared/requests/request';
import type { AsyncData } from 'nuxt/app';
import type { FetchError } from 'ofetch';
import type { Simplify } from 'type-fest';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RequestToAsyncData<TRequest extends Request<any, any, any, any>>
  = AsyncData<
    Serialize<Awaited<TRequest['output'] | undefined>>,
    FetchError<Simplify<ResponseError<TRequest>>> | undefined
  >;
