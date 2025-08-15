<template>
  <section class="relative">
    <div
      class="lg:!absolute inset-0 flex items-center justify-start"
    >
      <div class="lg:container pt-4 lg:pt-0 lg:mx-auto px-4 sm:px-6 lg:px-8">
        <div class="">
          <n-card
            :theme-overrides="{
              borderRadius: '1rem',
            }"
            class="mb-3 w-full lg:max-w-md"
          >
            <div class="mb-3">
              <n-h1>
                Faisons équipe
                <span>pour trouver</span>
                vos bureaux
              </n-h1>
              <n-flex vertical>
                <n-flex>
                  <Icon
                    name="mdi:check"
                  />
                  <span>Un expert dédié à vos côtés</span>
                </n-flex>
                <n-flex>
                  <Icon
                    name="mdi:check"
                  />
                  <span>100% des bureaux, 100% à jour</span>
                </n-flex>
                <n-flex>
                  <Icon
                    name="mdi:check"
                  />
                  <span>Service gratuit</span>
                </n-flex>
              </n-flex>
            </div>
            <n-p class="mb-3">
              Excellent 4.9 sur 5 <Icon name="mdi:star" /> <span class="font-bold">Trustpilot</span>
            </n-p>
            <n-flex :wrap="true">
              <NuxtLink to="search">
                <n-button
                  type="primary"
                  size="large"
                  tag="span"
                >
                  <template #icon>
                    <Icon name="mdi:search" />
                  </template>
                  Voir 8 283 annonces
                </n-button>
              </NuxtLink>
              <n-button
                size="large"
                @click="scrollToContact"
              >
                Confier ma recherche
              </n-button>
            </n-flex>
          </n-card>
          <n-button
            :theme-overrides="{
              color: 'white',
              textColor: 'black',
              colorHover: 'white',
              textColorHover: 'black',
              textColorFocus: 'black',
              colorFocus: 'white',
              colorPressed: 'white',
              textColorPressed: 'black',
            }"
            round
          >
            <template #icon>
              <Icon
                name="mdi:whatsapp"
                class="text-green-500"
              />
            </template>
            WhatsApp
          </n-button>
        </div>
      </div>
    </div>

    <div class="py-4 px-4 sm:px-6 lg:px-8">
      <img
        :src="heroImage"
        alt="Office spaces"
        class="w-full h-full object-cover rounded-lg"
      >
    </div>
    <HomePartnerMarquee />
  </section>
</template>

<script lang="ts" setup>
import heroImage from '@/assets/images/illustrations/hero/hero_4356x1800.webp';

const emit = defineEmits<{
  scrollToContact: [];
}>();

const scrollToContact = () => {
  emit('scrollToContact');
};
</script>
