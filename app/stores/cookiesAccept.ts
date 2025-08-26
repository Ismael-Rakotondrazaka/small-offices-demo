import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export const useCookiesAcceptStore = defineStore('cookiesAcceptStore', () => {
  const isAccepted = useStorage('cookies-accept', false);

  const accept = () => {
    isAccepted.value = true;
  };

  const resetAccept = () => {
    isAccepted.value = false;
  };

  return {
    accept: accept,
    isAccepted: readonly(isAccepted),
    reset: resetAccept,
  };
});
