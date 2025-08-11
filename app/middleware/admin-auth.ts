export default defineNuxtRouteMiddleware(async () => {
  const session = useSupabaseSession();

  if (session.value === null) {
    return navigateTo({
      name: 'admin-login',
    });
  }
});
