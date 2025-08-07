import type { PublicPathState } from 'vee-validate';

export const makeInputProps = <T>(state: PublicPathState<T>) => ({
  props: {
    feedback: state.errors.join('\n'),
    validationStatus: state.errors.length > 0 ? ('error' as const) : undefined,
  },
});
