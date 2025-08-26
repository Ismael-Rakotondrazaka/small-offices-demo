<template>
  <n-modal
    v-model:show="show"
    size="small"
    preset="dialog"
    type="info"
    :mask-closable="false"
    :closable="false"
  >
    <template #header>
      <div>Utilisation de Cookies</div>
    </template>

    <template #default>
      <n-p
        depth="1"
        class="text-base"
      >
        Ce site utilise des cookies essentiels au bon fonctionnement de la plateforme ainsi que des cookies tiers pour l'analyse d'audience via Google Analytics 4. En continuant votre navigation, vous acceptez leur utilisation.
      </n-p>
    </template>

    <template #action>
      <n-flex
        align="center"
        justify="center"
      >
        <NuxtLink
          :to="{
            name: 'politique-de-confidentialite',
          }"
          target="_blank"
        >
          <n-button
            tag="span"
            type="default"
          >
            <span class="text-base">En savoir plus</span>
          </n-button>
        </NuxtLink>

        <n-button
          type="info"
          @click="onAcceptCookiesHandler"
        >
          <span class="text-base">Accepter</span>
        </n-button>
      </n-flex>
    </template>
  </n-modal>
</template>

<script lang="ts" setup>
const show = defineModel<boolean>('show', {
  default: false,
  required: false,
});

const { accept } = useCookiesAcceptStore();
const onAcceptCookiesHandler = () => {
  accept();

  show.value = false;
};
</script>

<style scoped></style>
