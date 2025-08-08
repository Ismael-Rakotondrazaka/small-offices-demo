<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <img
          class="mx-auto h-12 w-auto"
          src="/images/logos/logo-petits-bureaux.svg"
          alt="Petits Bureaux"
        >
        <n-h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          <i18n-t
            keypath="admin.login.title"
            tag="span"
            scope="global"
          />
        </n-h2>
        <n-text
          depth="3"
          class="mt-2 text-sm"
        >
          <i18n-t
            keypath="admin.login.subtitle"
            tag="span"
            scope="global"
          />
        </n-text>
      </div>

      <n-card class="shadow-lg">
        <template #header>
          <div class="text-center">
            <Icon
              name="mdi:shield-account"
              class="h-8 w-8 text-blue-600 mx-auto mb-2"
            />
            <n-h3 class="text-lg font-medium">
              <i18n-t
                keypath="admin.login.form.title"
                tag="span"
                scope="global"
              />
            </n-h3>
          </div>
        </template>

        <SignInWithCredentialsAdminForm class="mb-5" />

        <n-divider>
          <i18n-t
            keypath="admin.login.form.or"
            tag="span"
            scope="global"
          />
        </n-divider>

        <SignInWithFacebookForm class="w-full" />

        <div class="mt-6 text-center">
          <n-text
            depth="3"
            class="text-sm"
          >
            <i18n-t
              keypath="admin.login.backToSite"
              tag="span"
              scope="global"
            />
            <n-button
              text
              type="primary"
              size="small"
              @click="navigateTo('/')"
            >
              <i18n-t
                keypath="admin.login.backToSiteLink"
                tag="span"
                scope="global"
              />
            </n-button>
          </n-text>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'guest',
});

defineOgImageComponent('DefaultOgImage');
</script>
