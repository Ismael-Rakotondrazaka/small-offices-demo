<template>
  <n-result
    :status="status"
    :title="title"
  >
    <template #footer>
      <ErrorPageClearButton />
    </template>
  </n-result>
</template>

<script lang="ts" setup>
interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: ResponseError<any>;
}

const { t } = useI18n({
  useScope: 'global',
});

const props = defineProps<Props>();

const title = computed(() => {
  const map: Record<number, string> = {
    400: 'errors.requests.defaults.badRequest',
    401: 'errors.requests.defaults.unauthorized',
    403: 'errors.requests.defaults.forbidden',
    404: 'errors.requests.defaults.notFound',
    500: 'errors.requests.defaults.internalServer',
    512: 'errors.requests.defaults.notImplemented',
  };

  return t(map[props.error.statusCode] ?? 'errors.default');
});

type IconRenderableStatus
  = | '403'
    | '404'
    | '500'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';

const status = computed<IconRenderableStatus>(() => {
  const statusString = props.error.statusCode.toString();

  if (statusString.startsWith('5')) {
    return '500';
  }

  if (statusString.startsWith('2')) {
    return 'success';
  }

  if (
    statusString === '401'
    || statusString === '404'
    || statusString === '403'
  ) {
    return '404';
  }

  if (statusString.startsWith('4')) {
    return 'error';
  }

  return 'error';
});
</script>

<style scoped></style>
