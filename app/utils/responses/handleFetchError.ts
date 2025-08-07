import type { Request, ResponseError } from '~~/shared';
import type { MessageApi } from 'naive-ui';
import type { ComposerTranslation } from 'vue-i18n';

import { FetchError } from 'ofetch';

export const isFetchErrorWithResponseError = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Data extends Request<any, any, any, any>,
>(
  error: unknown,
): error is FetchError<ResponseError<Data>> => {
  return (
    error instanceof FetchError
    && typeof error === 'object'
    && error !== null
    && 'data' in error
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleFetchError = <TRequest extends Request<any, any, any, any>>(
  error: unknown,

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: ComposerTranslation<Record<string, unknown>, any>,
  // message: ReturnType<typeof useMessage>,
  message: MessageApi,
  setErrors?: (
    // eslint-disable-next-line no-unused-vars
    errors: Record<
      keyof ResponseErrorData<TRequest['input']['body']>,
      string | string[] | undefined
    >,
  ) => void,
): boolean => {
  if (isFetchErrorWithResponseError<TRequest>(error) && error.data) {
    message.error(t(error.data.message));

    if (setErrors) {
      setErrors(translateResponseErrorData(t, error.data.data));
    }

    return true;
  }

  message.error(t('errors.default'));
  return false;
};
