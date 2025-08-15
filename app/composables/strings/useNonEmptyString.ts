export const useNonEmptyString = (
  value: Ref<null | string | undefined>,
  fallbackValue?: null | undefined,
) => {
  const watchStopHandle = watch(value, (newValue) => {
    if (newValue === '') {
      value.value = fallbackValue;
    }
  });

  onBeforeUnmount(() => {
    watchStopHandle();
  });
};
