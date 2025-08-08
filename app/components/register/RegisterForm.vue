<script lang="ts" setup>
import { type RegisterRequestBody, RegisterRequestBodySchema } from '#shared';

const { defineField, handleSubmit, isSubmitting, resetForm, setErrors }
  = useForm({
    initialValues: {
      email: undefined,
      password: undefined,
    },
    validationSchema: toTypedSchema(RegisterRequestBodySchema),
  });

const [firstName, firstNameProps] = defineField(
  'firstName',
  makeInputProps<RegisterRequestBody['firstName']>,
);
const [lastName, lastNameProps] = defineField(
  'lastName',
  makeInputProps<RegisterRequestBody['lastName']>,
);
const [password, passwordProps] = defineField(
  'password',
  makeInputProps<RegisterRequestBody['password']>,
);
const [email, emailProps] = defineField(
  'email',
  makeInputProps<RegisterRequestBody['email']>,
);

const message = useMessage();
const localeRoute = useLocaleRoute();
const { t } = useI18n();

const onSignInCredentialsClickHandler = handleSubmit(async (values) => {
  try {
    const supabaseAuth = useSupabaseAuth();
    const { error } = await supabaseAuth.signUp({
      email: values.email,
      options: {
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
        },
      },
      password: values.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    resetForm();

    await navigateTo(
      localeRoute({
        name: 'dashboard',
      }),
      {
        external: true,
      },
    );
  }
  catch (error) {
    handleFetchError<RegisterRequest>(error, t, message, setErrors);
  }
});
</script>

<template>
  <div>
    <n-form>
      <n-p class="text-base">
        {{ $t("auth.register.form.description") }}
      </n-p>

      <n-grid
        cols="2"
        item-responsive
        x-gap="14"
        responsive="screen"
      >
        <n-grid-item span="2 m:1">
          <n-form-item
            required
            :label="$t('users.forms.fields.firstName.label')"
            v-bind="firstNameProps"
          >
            <n-input
              v-model:value="firstName"
              type="text"
              :placeholder="$t('users.forms.fields.firstName.placeholder')"
            />
          </n-form-item>
        </n-grid-item>

        <n-grid-item span="2 m:1">
          <n-form-item
            required
            :label="$t('users.forms.fields.lastName.label')"
            v-bind="lastNameProps"
          >
            <n-input
              v-model:value="lastName"
              type="text"
              :placeholder="$t('users.forms.fields.lastName.placeholder')"
            />
          </n-form-item>
        </n-grid-item>
      </n-grid>

      <n-form-item
        required
        :label="$t('users.forms.fields.email.label')"
        v-bind="emailProps"
      >
        <n-input
          v-model:value="email"
          type="text"
          :placeholder="$t('users.forms.fields.email.placeholder')"
        />
      </n-form-item>

      <n-form-item
        required
        :label="$t('users.forms.fields.password.label')"
        v-bind="passwordProps"
      >
        <n-input
          v-model:value="password"
          type="password"
          :placeholder="$t('users.forms.fields.password.placeholder')"
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

        {{ $t("forms.buttons.register") }}
      </n-button>
    </n-form>
  </div>
</template>

<style scoped></style>
