export default defineI18nConfig(() => ({
  datetimeFormats: {
    fr: {
      long: {
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        month: 'long',
        year: 'numeric',
      },
      short: {
        day: 'numeric',
        month: 'numeric',
        year: '2-digit',
      },
    },
  },
  legacy: false,
  locale: 'fr',
  numberFormats: {
    fr: {
      currency: {
        currency: 'EUR',
        currencyDisplay: 'symbol',
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
        notation: 'standard',
        style: 'currency',
      },
      decimal: {
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
        style: 'decimal',
        useGrouping: true,
      },
      percent: {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
        style: 'percent',
        useGrouping: false,
      },
    },
  },
}));
