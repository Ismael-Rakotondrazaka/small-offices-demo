import { serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
  // TODO: Add role to user
  const authUser = await serverSupabaseUser(event);
  console.log('authUser', authUser);
});
