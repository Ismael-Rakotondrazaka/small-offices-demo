<template>
  <LMap
    :zoom="13"
    :center="currentArrLocation"
    :use-global-leaflet="false"
  >
    <LTileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
      layer-type="base"
      name="OpenStreetMap"
    />

    <LMarker
      :lat-lng="[lat, lng]"
      :draggable="true"
      @update:lat-lng="updateLatLng"
    />

    <LGeoJson
      :geojson="arrondissements"
      :options-style="geoStyler"
    />
  </LMap>
</template>

<script lang="ts" setup>
import arrondissements from '~~/shared/map/arrondissements.json';

const arr = defineModel<number>('arr', {
  default: 1,
  required: false,
});
const lat = defineModel<number>('lat', {
  default: 48.8596,
  required: false,
});
const lng = defineModel<number>('lng', {
  default: 2.3429,
  required: false,
});

const PARIS_ARRONDISSEMENTS = [
  { arr: 1, lat: 48.8596, lng: 2.3429, name: 'Louvre' }, // Near Palais Royal
  { arr: 2, lat: 48.8676, lng: 2.3416, name: 'Bourse' }, // Near Rue Montmartre
  { arr: 3, lat: 48.8642, lng: 2.3622, name: 'Temple' }, // Near Carreau du Temple
  { arr: 4, lat: 48.8558, lng: 2.3565, name: 'Hôtel-de-Ville' }, // Near Centre Pompidou
  { arr: 5, lat: 48.8449, lng: 2.3467, name: 'Panthéon' }, // Near Sorbonne
  { arr: 6, lat: 48.8496, lng: 2.3319, name: 'Luxembourg' }, // Near Jardin du Luxembourg
  { arr: 7, lat: 48.8567, lng: 2.3125, name: 'Palais-Bourbon' }, // Near Les Invalides
  { arr: 8, lat: 48.8731, lng: 2.3075, name: 'Élysée' }, // Near Champs-Élysées
  { arr: 9, lat: 48.8746, lng: 2.3356, name: 'Opéra' }, // Near Galeries Lafayette
  { arr: 10, lat: 48.8756, lng: 2.3579, name: 'Entrepôt' }, // Near Canal Saint-Martin
  { arr: 11, lat: 48.8573, lng: 2.3706, name: 'Popincourt' }, // Near Place de la République
  { arr: 12, lat: 48.8402, lng: 2.3879, name: 'Reuilly' }, // Near Gare de Lyon
  { arr: 13, lat: 48.8305, lng: 2.3562, name: 'Gobelins' }, // Near Place d'Italie
  { arr: 14, lat: 48.8300, lng: 2.3231, name: 'Observatoire' }, // Near Parc Montsouris
  { arr: 15, lat: 48.8411, lng: 2.3003, name: 'Vaugirard' }, // Near Porte de Versailles
  { arr: 16, lat: 48.8638, lng: 2.2765, name: 'Passy' }, // Near Trocadéro
  { arr: 17, lat: 48.8836, lng: 2.3065, name: 'Batignolles-Monceau' }, // Near Place de Clichy
  { arr: 18, lat: 48.8922, lng: 2.3447, name: 'Butte-Montmartre' }, // Near Sacré-Cœur
  { arr: 19, lat: 48.8807, lng: 2.3823, name: 'Buttes-Chaumont' }, // Near Parc des Buttes-Chaumont
  { arr: 20, lat: 48.8645, lng: 2.3982, name: 'Ménilmontant' }, // Near Père Lachaise
];

const currentArrLocation = computed<[number, number]>(() => {
  const arrondissement = PARIS_ARRONDISSEMENTS.find(a => a.arr === arr.value);

  if (!arrondissement) {
    return [48.8566, 2.3522];
  }

  return [arrondissement.lat, arrondissement.lng];
});

const geoStyler = (feature: { properties: { code: number } }) => ({
  opacity: feature.properties.code / 100000,
});

const updateLatLng = ({ lat: newLat, lng: newLng }: { lat: number; lng: number }) => {
  lat.value = newLat;
  lng.value = newLng;
};

const isUpdatingFromArr = ref(false);
const isUpdatingFromCoordinates = ref(false);

watch([lat, lng], ([newLat, newLng], [oldLat, oldLng]) => {
  if (isUpdatingFromArr.value) return;

  if (newLat !== oldLat || newLng !== oldLng) {
    isUpdatingFromCoordinates.value = true;

    const detectedArr = findArrondissementByCoordinates(newLat, newLng);
    if (detectedArr && detectedArr !== arr.value) {
      arr.value = detectedArr;
    }

    isUpdatingFromCoordinates.value = false;
  }
});

watch(arr, (newArr, oldArr) => {
  if (isUpdatingFromCoordinates.value) return;

  if (newArr !== oldArr) {
    isUpdatingFromArr.value = true;

    const arrondissement = PARIS_ARRONDISSEMENTS.find(a => a.arr === newArr);
    if (arrondissement) {
      const currentArr = findArrondissementByCoordinates(lat.value, lng.value);

      if (currentArr !== newArr) {
        lat.value = arrondissement.lat;
        lng.value = arrondissement.lng;
      }
    }

    isUpdatingFromArr.value = false;
  }
});
</script>

<style>

</style>
