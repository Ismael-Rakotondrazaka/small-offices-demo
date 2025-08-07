<script lang="ts" setup>
import { SignInWithCredentialsRequestBodySchema } from '#shared';

const { defineField, handleSubmit, isSubmitting, resetForm, setErrors }
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
const localeRoute = useLocaleRoute();
const { t } = useI18n();

const onSignInCredentialsClickHandler = handleSubmit(async (values) => {
  try {
    const body: SignInWithCredentialsRequestBody = {
      email: values.email,
      password: values.password,
    };

    await $fetch('/api/auth/sign-in', {
      body,
      method: 'POST',
    });

    resetForm();

    await navigateTo(
      localeRoute({
        name: 'chats',
      }),
      {
        external: true,
      },
    );
  }
  catch (error) {
    handleFetchError<SignInWithCredentialsRequest>(
      error,
      t,
      message,
      setErrors,
    );
  }
});
</script>

<template>
  <div>
    <n-form>
      <n-p class="text-base">
        {{
          $t("auth.signIn.form.credentials.description")
        }}
      </n-p>

      <n-form-item
        required
        :label="$t('forms.fields.email.label')"
        v-bind="emailProps"
      >
        <n-input
          v-model:value="email"
          type="text"
          :placeholder="$t('forms.fields.email.placeholder')"
        />
      </n-form-item>

      <n-form-item
        required
        :label="$t('forms.fields.password.label')"
        v-bind="passwordProps"
      >
        <n-input
          v-model:value="password"
          type="password"
          :placeholder="$t('forms.fields.password.placeholder')"
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

        {{ $t("forms.buttons.signIn") }}
      </n-button>
    </n-form>
  </div>
</template>

<style scoped></style>
