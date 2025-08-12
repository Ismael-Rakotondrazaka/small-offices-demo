<template>
  <footer class="bg-[#f9f9fa] py-10 px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto px-2">
      <n-grid
        cols="4"
        item-responsive
        responsive="screen"
        class="mb-10"
        x-gap="8"
        y-gap="8"
      >
        <n-grid-item span="4 m:2 l:1 xl:1 2xl:1">
          <n-h3>Bureaux</n-h3>
          <ul>
            <li
              v-for="item in bureauxLinks"
              :key="item.name"
              class="mb-2"
            >
              <NuxtLink :to="item.href">
                <n-text>
                  {{ item.name }}
                </n-text>
              </NuxtLink>
            </li>
          </ul>
        </n-grid-item>
        <n-grid-item span="4 m:2 l:1 xl:1 2xl:1">
          <n-h3>Tous les espaces de coworking</n-h3>
          <ul>
            <li
              v-for="item in coworkingLinks"
              :key="item.name"
              class="mb-2"
            >
              <NuxtLink :to="item.href">
                <n-text>
                  {{ item.name }}
                </n-text>
              </NuxtLink>
            </li>
          </ul>
        </n-grid-item>
        <n-grid-item span="4 m:2 l:1 xl:1 2xl:1">
          <n-h3>À propos de Petits Bureaux</n-h3>

          <ul>
            <li
              v-for="item in aboutLinks"
              :key="item.name"
              class="mb-2"
            >
              <NuxtLink :to="item.href">
                <n-text>
                  {{ item.name }}
                </n-text>
              </NuxtLink>
            </li>
          </ul>
        </n-grid-item>

        <n-grid-item span="4 m:2 l:1 xl:1 2xl:1">
          <n-h3>Nous contacter</n-h3>
          <ul>
            <li
              class="mb-2"
            >
              <n-text

                tag="a"
                href="#"
              >
                <Icon
                  name="mdi:handshake"
                  class="mr-2"
                />
                Parler à un expert
              </n-text>
            </li>
            <li
              class="mb-2"
            >
              <n-text
                tag="a"
                href="#"
              >
                <Icon
                  name="mdi:send"
                  class="mr-2"
                />
                Envoyer un message
              </n-text>
            </li>
            <li
              class="mb-2"
            >
              <n-text

                tag="a"
                href="tel:0755540609"
              >
                <Icon
                  name="mdi:phone"
                  class="mr-2"
                />
                07 55 54 06 09
              </n-text>
            </li>
          </ul>
          <n-h3
            id="contact"
            class="mt-6"
          >
            Abonnez-vous à notre newsletter
          </n-h3>
          <n-form
            class="mt-2"
            @submit.prevent
          >
            <n-form-item
              label="Adresse email"
              path="email"
            >
              <n-input
                id="email-address"
                name="email-address"
                type="email"
                autocomplete="email"
                required
                placeholder="Adresse email"
              />
            </n-form-item>

            <n-button
              type="primary"
              primary
            >
              S'abonner
            </n-button>
          </n-form>
        </n-grid-item>
      </n-grid>

      <div class="">
        <div class="flex gap-4">
          <n-text
            tag="a"
            href="#"
            aria-label="LinkedIn"
          >
            <span class="mr-1">LinkedIn</span>
            <Icon name="mdi:linkedin" />
          </n-text>

          <n-text
            tag="a"
            href="#"
            aria-label="Instagram"
          >
            <span class="mr-1">Instagram</span>
            <Icon name="mdi:instagram" />
          </n-text>

          <n-text
            tag="a"
            href="#"
            aria-label="Twitter"
          >
            <span class="mr-1">Twitter</span>
            <Icon name="mdi:twitter" />
          </n-text>
        </div>
      </div>

      <n-p
        depth="3"
        class="text-xs text-gray-500"
      >
        Copyright © 2010-{{ new Date().getFullYear() }} Petits Bureaux. Tous droits réservés. À propos – CGU & mentions légales – Politique de confidentialité – Guide location de bureaux – Guide du coworking à Paris
      </n-p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

const bureauxLinks = ref([
  { href: '#', name: 'Location de bureaux à Paris' },
  { href: '#', name: 'Location de bureaux à Lyon' },
  { href: '#', name: 'Location de bureaux à Marseille' },
  { href: '#', name: 'Location de bureaux à Bordeaux' },
]);

const coworkingLinks = ref([
  { href: '#', name: 'À propos du coworking' },
  { href: '#', name: 'Coworking à Paris' },
  { href: '#', name: 'Coworking à Lyon' },
  { href: '#', name: 'Coworking à Marseille' },
  { href: '#', name: 'Coworking à Bordeaux' },
]);

const aboutLinks = ref([
  { href: '#', name: 'L’emplacement idéal pour vos bureaux' },
  { href: '#', name: 'Comparateur de contrats' },
  { href: '#', name: 'À propos' },
  { href: '#', name: 'Louer un bureau : comment ça marche ?' },
  { href: '#', name: 'Chercher un bureau : comment ça marche ?' },
  { href: '#', name: 'Média' },
  { href: '#', name: 'Nous rejoindre' },
]);
</script>
