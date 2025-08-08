import type { SignInWithCredentialsRequest } from '~~/shared';

import { EventHandlerBuilder } from '~~/server/core/requests/eventHandlerBuilder';
import { SignInWithCredentialsRequestBodySchema } from '~~/shared';

export default new EventHandlerBuilder<SignInWithCredentialsRequest>()
  .body(SignInWithCredentialsRequestBodySchema)
  .handle(async ({ body }) => {
    const { serverSupabaseClient } = await import('#supabase/server');
    const client = await serverSupabaseClient();

    const { data, error } = await client.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error('Failed to sign in');
    }

    return {
      data: {
        firstName: data.user.user_metadata?.firstName || '',
        id: data.user.id,
        image: null,
        lastName: data.user.user_metadata?.lastName || '',
      },
    };
  });
