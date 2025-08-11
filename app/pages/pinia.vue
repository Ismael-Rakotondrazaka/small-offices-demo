<template>
  <div class="mx-auto w-full max-w-2xl p-3">
    <n-h1>Pinia (état persistant)</n-h1>

    <n-space justify="space-around">
      <n-statistic
        :label="'Compte'"
        class="mb-5"
      >
        <p>{{ countStore.count }}</p>
      </n-statistic>

      <n-statistic
        :label="'Compte doublé'"
        class="mb-5"
      >
        <p>{{ countStore.doubledCount }}</p>
      </n-statistic>
    </n-space>

    <n-space justify="center">
      <n-button
        id="decrement-button"
        type="primary"
        @click="onDecrementHandler"
      >
        <template #icon>
          <Icon name="mdi:minus" />
        </template>

        <template #default>
          Décrémenter
        </template>
      </n-button>

      <n-button
        type="primary"
        @click="onIncrementHandler"
      >
        <template #icon>
          <Icon name="mdi:add" />
        </template>

        <template #default>
          Incrémenter
        </template>
      </n-button>

      <n-button
        type="primary"
        @click="onRandomHandler"
      >
        <template #icon>
          <Icon name="mdi:shuffle" />
        </template>

        <template #default>
          Aléatoire
        </template>
      </n-button>

      <n-button
        type="primary"
        @click="onResetHandler"
      >
        <template #icon>
          <Icon name="mdi:restore" />
        </template>

        <template #default>
          Réinitialiser
        </template>
      </n-button>
    </n-space>

    <n-divider />

    <n-statistic
      :label="'Nom'"
      class="mb-5"
    >
      <p>{{ countStore.name || "&nbsp;" }}</p>
    </n-statistic>

    <n-input
      v-model:value="countStore.name"
      type="text"
      show-count
      :placeholder="'Entrez un nom'"
    />
  </div>
</template>

<script lang="ts" setup>
defineOgImageComponent('DefaultOgImage');

const countStore = useCounterStore();

const { gtag } = useGtag();

const onIncrementHandler = () => {
  countStore.increment();

  gtag('event', 'click', {
    event_category: 'button',
    event_label: 'pinia.count.actions.increment',
  });
};

const onDecrementHandler = () => {
  countStore.decrement();

  gtag('event', 'click', {
    event_category: 'button',
    event_label: 'pinia.count.actions.decrement',
  });
};

const onRandomHandler = () => {
  countStore.random();

  gtag('event', 'click', {
    event_category: 'button',
    event_label: 'pinia.count.actions.random',
  });
};

const onResetHandler = () => {
  countStore.reset();

  gtag('event', 'click', {
    event_category: 'button',
    event_label: 'pinia.count.actions.reset',
  });
};
</script>

<style scoped></style>
