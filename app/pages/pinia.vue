<template>
  <div class="mx-auto w-full max-w-2xl p-3">
    <n-h1>{{ $t("pinia.title") }}</n-h1>

    <n-space justify="space-around">
      <n-statistic
        :label="$t('pinia.count.statistic.count')"
        class="mb-5"
      >
        <p>{{ countStore.count }}</p>
      </n-statistic>

      <n-statistic
        :label="$t('pinia.count.statistic.doubledCount')"
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
          {{ $t("pinia.count.actions.decrement") }}
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
          {{ $t("pinia.count.actions.increment") }}
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
          {{ $t("pinia.count.actions.random") }}
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
          {{ $t("pinia.count.actions.reset") }}
        </template>
      </n-button>
    </n-space>

    <n-divider />

    <n-statistic
      :label="$t('pinia.name.title')"
      class="mb-5"
    >
      <p>{{ countStore.name || "&nbsp;" }}</p>
    </n-statistic>

    <n-input
      v-model:value="countStore.name"
      type="text"
      show-count
      :placeholder="$t('pinia.name.input.placeholder')"
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
