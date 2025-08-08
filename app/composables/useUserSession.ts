export const useUserSession = () => {
  const supabaseAuth = useSupabaseAuth();

  return {
    clear: supabaseAuth.clear,
    loggedIn: supabaseAuth.loggedIn,
    user: computed(() => supabaseAuth.user.value),
  };
};
