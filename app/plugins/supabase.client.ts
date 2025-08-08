export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  return {
    provide: {
      supabase: {
        key: config.public.supabaseKey,
        url: config.public.supabaseUrl,
      },
    },
  };
});
