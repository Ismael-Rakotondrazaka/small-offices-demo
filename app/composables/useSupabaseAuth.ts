import type { User } from '@supabase/supabase-js';

export const useSupabaseAuth = () => {
  const client = useSupabaseClient();
  const user = useSupabaseUser();
  const { signIn, signOut, signUp } = useSupabaseAuthClient();

  const loggedIn = computed(() => !!user.value);

  const clear = async () => {
    await signOut();
  };

  const getUserSession = async () => {
    if (!user.value) {
      throw new Error('User not authenticated');
    }

    return {
      user: {
        createdAt: user.value.created_at,
        email: user.value.email || '',
        firstName: user.value.user_metadata?.firstName || '',
        id: user.value.id,
        lastName: user.value.user_metadata?.lastName || '',
        updatedAt: user.value.updated_at || user.value.created_at,
      },
    };
  };

  const requireUserSession = async () => {
    if (!user.value) {
      throw new Error('User session required');
    }

    return {
      user: {
        createdAt: user.value.created_at,
        email: user.value.email || '',
        firstName: user.value.user_metadata?.firstName || '',
        id: user.value.id,
        lastName: user.value.user_metadata?.lastName || '',
        updatedAt: user.value.updated_at || user.value.created_at,
      },
    };
  };

  const replaceUserSession = async (data: Omit<User, 'id'>) => {
    if (!user.value) {
      throw new Error('User not authenticated');
    }

    const { error } = await client.auth.updateUser({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });

    if (error) {
      throw error;
    }

    return await getUserSession();
  };

  return {
    clear,
    getUserSession,
    loggedIn,
    replaceUserSession,
    requireUserSession,
    signIn,
    signOut,
    signUp,
    user,
  };
};
