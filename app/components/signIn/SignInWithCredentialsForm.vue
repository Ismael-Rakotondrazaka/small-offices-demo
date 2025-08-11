<script lang="ts" setup>
import { SignInWithCredentialsRequestBodySchema } from '#shared';

const { defineField, handleSubmit, isSubmitting, resetForm }
  = useForm({
    validationSchema: toTypedSchema(SignInWithCredentialsRequestBodySchema),
  });

const [password, passwordProps] = defineField(
  'password',
  makeInputProps<SignInWithCredentialsRequestBody['password']>,
);

const [email, emailProps] = defineField(
  'email',
  makeInputProps<SignInWithCredentialsRequestBody['email']>,
);

const message = useMessage();

const supabase = useSupabaseClient();

const onSignInCredentialsClickHandler = handleSubmit(async (values) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });

  if (error) {
    message.error(
      'La connexion a échoué. Vérifiez que les informations fournies sont correctes.',
    );

    return;
  };

  resetForm();

  await navigateTo(
    {
      name: 'admin-dashboard',
    },
    {
      external: true,
    },
  );
});
</script>

<template>
  <div>
    <n-form>
      <n-p class="text-base">
        Saisissez vos identifiants pour accéder à votre compte.
      </n-p>

      <n-form-item
        required
        label="Adresse mail"
        v-bind="emailProps"
      >
        <n-input
          v-model:value="email"
          type="text"
          placeholder="email@exemple.com"
        />
      </n-form-item>

      <n-form-item
        required
        label="Mot de passe"
        v-bind="passwordProps"
      >
        <n-input
          v-model:value="password"
          type="password"
          placeholder="********"
          show-password-on="click"
        />
      </n-form-item>

      <n-button
        type="primary"
        :loading="isSubmitting"
        class="w-full"
        @click="onSignInCredentialsClickHandler"
      >
        <template #icon>
          <Icon name="mdi:login" />
        </template>

        Se connecter
      </n-button>
    </n-form>
  </div>
</template>

<style scoped></style>
