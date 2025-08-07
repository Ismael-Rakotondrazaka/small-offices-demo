import { NavigationException } from '~/utils/routes/navigationException';

export default defineNuxtRouteMiddleware(() => {
  const { loggedIn } = useUserSession();

  if (!loggedIn.value) {
    return NavigationException.unauthorized();
  }
});
