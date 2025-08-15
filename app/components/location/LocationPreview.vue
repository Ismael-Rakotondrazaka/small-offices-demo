<template>
  <LMap
    :zoom="15"
    :center="[lat, lng]"
    :use-global-leaflet="false"
  >
    <LTileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
      layer-type="base"
      name="OpenStreetMap"
    />
    <LCircle
      :radius="70"
      color="red"
      :lat-lng="[lat, lng]"
    />
  </LMap>
</template>

<script lang="ts" setup>
interface Props {
  lat: number;
  lng: number;
}

defineProps<Props>();
</script>

<style>

</style>
