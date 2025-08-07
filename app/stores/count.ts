export const useCounterStore = defineStore(
  'counter',
  () => {
    const count = ref(0);
    const name = ref('');
    const doubledCount = computed(() => count.value * 2);

    const increment = () => {
      count.value++;
    };
    const decrement = () => {
      count.value--;
    };
    const reset = () => {
      count.value = 0;
    };
    const random = () => {
      count.value = Math.round(Math.random() * 100);
    };

    return {
      count,
      decrement,
      doubledCount,
      increment,
      name,
      random,
      reset,
    };
  },
  {
    persist: true,
  },
);
