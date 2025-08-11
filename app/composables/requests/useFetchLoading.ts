import type { AsyncDataRequestStatus } from '#app';

export const useFetchLoading = (status: Ref<AsyncDataRequestStatus>) => {
  return computed(() => status.value === 'pending');
};
