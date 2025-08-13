<template>
  <LMap
    :zoom="13"
    :center="[48.8534, 2.4288]"
    :use-global-leaflet="false"
  >
    <LTileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
      layer-type="base"
      name="OpenStreetMap"
    />

    <LMarker
      v-for="office in offices"
      :key="office.id"
      :lat-lng="[office.lat, office.lng]"
    >
      <LPopup>
        <n-thing
          :bordered="false"
        >
          <img
            :alt="office.title"
            :src="office.photos[0]!.url"
            class="w-full h-full object-cover max-h-10"
          >

          <p
            strong
          >
            <n-text string>
              Paris {{ office.arr }}
              ·
              {{ office.posts }} postes
              ·
              <template v-if="office.services.length">
                {{ office.services.length }} services
              </template>
            </n-text>
          </p>

          <p>
            <i18n-n
              scope="global"
              tag="span"
              :value="office.price"
              format="currency"
              class="font-bold"
            /> par mois
          </p>
        </n-thing>
      </LPopup>
    </LMarker>

    <LGeoJson
      :geojson="geojson"
      :options-style="geoStyler"
    />
  </LMap>
</template>

<script lang="ts" setup>
interface Props {
  offices: Serialize<OfficeDTO>[];
}

defineProps<Props>();

const geojson = ref(undefined);
const geoStyler = (feature: { properties: { code: number } }) => ({
  opacity: feature.properties.code / 100000,
});

onMounted(async () => {
  const response = await fetch(
    'https://rawgit.com/gregoiredavid/france-geojson/master/departements/75-paris/arrondissements-75-paris.geojson',
  );
  geojson.value = await response.json();
});
</script>

<style>

</style>
