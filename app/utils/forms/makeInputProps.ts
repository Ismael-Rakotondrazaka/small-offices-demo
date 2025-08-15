import type { PublicPathState } from 'vee-validate';

export const makeInputProps = <T>(state: PublicPathState<T>) => ({
  props: {
    feedback: state.errors.length ? state.errors[0] : undefined,
    validationStatus: state.errors.length > 0 ? ('error' as const) : undefined,
  },
});
