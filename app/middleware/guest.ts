export default defineNuxtRouteMiddleware(() => {
  const authUser = useSupabaseUser();

  if (authUser.value === null) {
    return navigateTo({
      name: 'admin-dashboard',
    });
  }
});
