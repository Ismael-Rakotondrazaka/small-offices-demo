import { breakpointsTailwind, useWindowSize } from '@vueuse/core';
import { computed } from 'vue';

export const useCustomWindowSize = () => {
  const { height, width } = useWindowSize();

  const isPhone = computed(() => width.value <= breakpointsTailwind.sm);
  const isTablet = computed(
    () =>
      width.value > breakpointsTailwind.sm
      && width.value < breakpointsTailwind.md,
  );
  const isLaptop = computed(
    () =>
      width.value >= breakpointsTailwind.md
      && width.value < breakpointsTailwind.lg,
  );
  const isDesktop = computed(
    () =>
      width.value >= breakpointsTailwind.lg
      && width.value < breakpointsTailwind.xl,
  );
  const isLargeDesktop = computed(() => width.value >= breakpointsTailwind.xl);

  const isTabletOrLarger = computed(
    () => width.value >= breakpointsTailwind.md,
  );
  const isLaptopOrLarger = computed(
    () => width.value >= breakpointsTailwind.lg,
  );
  const isDesktopOrLarger = computed(
    () => width.value >= breakpointsTailwind.xl,
  );

  return {
    height,
    isDesktop,
    isDesktopOrLarger,
    isLaptop,
    isLaptopOrLarger,
    isLargeDesktop,
    isPhone,
    isTablet,
    isTabletOrLarger,
    width,
  };
};
