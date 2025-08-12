<template>
  <section class="py-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <n-h1 class="font-roslindale-bold">
        Tous les bureaux sont sur Petits Bureaux
      </n-h1>

      <n-grid
        cols="4"
        x-gap="8"
        y-gap="8"
        item-responsive
        responsive="screen"
      >
        <n-grid-item
          v-for="officeType in officeTypes"
          :key="officeType.id"
          span="4 m:2 l:1 xl:1 2xl:1"
        >
          <n-card
            :title="officeType.title"
            @click="handleOfficeTypeClick(officeType)"
          >
            <template #cover>
              <img
                :src="officeType.image"
                :alt="officeType.alt"
                class="w-full h-full object-cover"
              >
            </template>

            <template #default>
              <n-tag
                size="small"
                type="info"
              >
                {{ officeType.capacity }}
              </n-tag>

              <n-p>
                {{ officeType.description }}
              </n-p>
            </template>

            <template #action>
              <n-flex
                justify="flex-end"
              >
                <n-button
                  size="small"
                  type="primary"
                  text
                  icon-placement="right"
                  @click="officeType.action ? officeType.action() : undefined"
                >
                  <template #icon>
                    <Icon
                      name="mdi:arrow-right"
                    />
                  </template>
                  {{ officeType.actionText }}
                </n-button>
              </n-flex>
            </template>
          </n-card>
        </n-grid-item>
      </n-grid>
    </div>
  </section>
</template>

<script lang="ts" setup>
import buildingImage from '~/assets/images/illustrations/offices/building.webp';
import independentImage from '~/assets/images/illustrations/offices/independent.webp';
import openSpaceImage from '~/assets/images/illustrations/offices/open_space.webp';
import privateImage from '~/assets/images/illustrations/offices/private.webp';

type OfficeType = {
  action?: () => void;
  actionText?: string;
  alt: string;
  capacity: string;
  description: string;
  id: number;
  image: string;
  title: string;
};

const emit = defineEmits<{
  scrollToContact: [];
}>();

const officeTypes: OfficeType[] = [
  {
    action: () => emit('scrollToContact'),
    actionText: 'Nous contacter',
    alt: 'Bureau opéré ou immeuble entier',
    capacity: '70+ postes',
    description: 'Lieu rien que pour votre entreprise : vos collaborateurs et visiteurs vivent votre culture d\'entreprise dès l\'accueil.',
    id: 1,
    image: buildingImage,
    title: 'Bureau opéré / Immeuble entier',
  },
  {
    action: () => navigateTo('/search'),
    actionText: 'Voir les bureaux',
    alt: 'Étage ou plateau indépendant',
    capacity: '20 - 100 postes',
    description: 'Étage réservé à vos équipes avec salles de réunion, cuisine, etc. Accédez aussi aux services communs d\'un coworking ou immeuble partagé.',
    id: 2,
    image: independentImage,
    title: 'Étage / plateau indépendant',
  },
  {
    action: () => navigateTo('/search'),
    actionText: 'Voir les bureaux',
    alt: 'Bureau privé clé en main',
    capacity: '1 - 40 postes',
    description: 'Bureau équipé et fermé au sein d\'un espace de coworking ou chez une entreprise classique. Bénéficiez des salles de réunion et services partagés.',
    id: 3,
    image: privateImage,
    title: 'Bureau privé clé en main',
  },
  {
    action: () => navigateTo('/search'),
    actionText: 'Voir les bureaux',
    alt: 'Poste en open space',
    capacity: '1 - 10 postes',
    description: 'Postes dédiés ou nomades dans un espace ouvert et partagé : budget avantageux, mutualisation des services et échanges renforcés.',
    id: 4,
    image: openSpaceImage,
    title: 'Poste en open Space',
  },
];

const handleOfficeTypeClick = (officeType: OfficeType) => {
  if (officeType.action) {
    officeType.action();
  }
};
</script>
