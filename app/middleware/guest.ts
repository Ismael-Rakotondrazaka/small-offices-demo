export default defineNuxtRouteMiddleware(() => {
  const { loggedIn } = useUserSession();
  const localeRoute = useLocaleRoute();

  if (loggedIn.value) {
    return navigateTo(
      localeRoute({
        name: 'chats',
      }),
    );
  }
});
