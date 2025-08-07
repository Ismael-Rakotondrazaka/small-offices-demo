export const useFullname = <
  T extends {
    firstName: string;
    lastName: string;
  },
>(
  user: MaybeRefOrGetter<T>,
) => {
  return computed(() => {
    const value = toValue(user);
    return `${value.firstName} ${value.lastName}`.trim();
  });
};
