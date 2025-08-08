import { NavigationException } from '~/utils/routes/navigationException';

export default defineNuxtRouteMiddleware(async () => {
  const authUser = useSupabaseUser();

  if (authUser.value === null) {
    return NavigationException.unauthorized();
  }
});
