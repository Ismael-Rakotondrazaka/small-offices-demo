import type { ComposerTranslation } from 'vue-i18n';

import { mapValues } from 'es-toolkit';

const translateOptionsIfNecessary = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: ComposerTranslation<Record<string, unknown>, any>,
  errorDataIssue: ResponseErrorIssue,
): ResponseErrorIssue[1] => {
  if (errorDataIssue[0] === 'zodI18n.errors.invalid_type') {
    return mapValues(errorDataIssue[1], value => t(`zodI18n.types.${value}`));
  }

  if (
    errorDataIssue[0].startsWith('zodI18n.errors.invalid_string.')
    && 'validation' in errorDataIssue[1]
  ) {
    return mapValues(errorDataIssue[1], value =>
      t(`zodI18n.validations.${value}`),
    );
  }

  return errorDataIssue[1];
};

export const translateResponseErrorData = <TInput>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: ComposerTranslation<Record<string, unknown>, any>,
  errorData: ResponseErrorData<TInput>,
): Record<keyof ResponseErrorData<TInput>, string | string[] | undefined> => {
  return mapValues(errorData, (errorDataIssue) => {
    if (!errorDataIssue) {
      return undefined;
    }

    return t(errorDataIssue[0], translateOptionsIfNecessary(t, errorDataIssue));
  });
};
