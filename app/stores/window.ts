import { useWindowSize } from '@vueuse/core';

export const useWindowStore = defineStore('windowWidth', () => {
  const { height, width } = useWindowSize();
  const isMobileOrTablet = computed(() => width.value <= 1280);

  return {
    height,
    isMobileOrTablet,
    width,
  };
});
