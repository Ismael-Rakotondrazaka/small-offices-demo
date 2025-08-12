import type { Request } from '#shared/requests/request';
import type { FlattenedPath } from '#shared/types/flatten';
import type { ReasonPhrases, StatusCodes } from 'http-status-codes';
import type { Simplify } from 'type-fest';

export interface ResponseError<
  TRequest extends Request<
    unknown,
    unknown,
    Record<string, never | number | string>,
    unknown
  >,
> {
  data: TRequest['input']['body'] extends Record<string, never>
    ? Record<string, never>
    : Simplify<ResponseErrorData<TRequest['input']['body']>>;
  message: string;
  stack: string;
  statusCode: StatusCodes;
  statusMessage: ReasonPhrases;
  url: string;
}

export type ResponseErrorData<TInput> = Partial<
  Record<FlattenedPath<TInput>, ResponseErrorIssue>
>;

export type ResponseErrorIssue = [
  // code
  string,
  // params
  Record<string, number | string>,
];
