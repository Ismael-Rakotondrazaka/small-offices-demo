export default defineNuxtRouteMiddleware(() => {
  const session = useSupabaseSession();

  if (session.value !== null) {
    return navigateTo({
      name: 'admin-dashboard',
    });
  }
});
