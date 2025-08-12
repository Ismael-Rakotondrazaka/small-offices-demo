<template>
  <section class="py-20 bg-white dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto">
      <n-h2 class="font-roslindale-bold text-center">
        La FAQ de Petits Bureaux et de l'immobilier d'entreprise
      </n-h2>

      <div class="max-w-3xl mx-auto">
        <n-card
          v-for="faq in faqs"
          :key="faq.id"
          class="mb-3"
        >
          <n-collapse>
            <n-collapse-item
              :name="faq.id"
              :title="faq.question"
            >
              <p class="whitespace-pre-wrap">
                {{ faq.answer }}
              </p>
            </n-collapse-item>
          </n-collapse>
        </n-card>

        <n-flex justify="flex-end">
          <n-button
            size="large"
            type="primary"
            secondary
          >
            Voir toute la FAQ
          </n-button>
        </n-flex>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
type Faq = {
  answer: string;
  id: string;
  question: string;
};

const faqs: Faq[] = [
  {
    answer: 'Vous choisissez comment lancer votre recherche : contactez directement des annonces ou envoyez-nous vos critères. Dans les 2 cas, nos experts vous rappellent pour faire le point, vous envoient des recommandations puis vous accompagnent sur le terrain en visite. Grâce à notre messagerie instantanée vous êtes aussi en contact direct avec les gestionnaires des bureaux !',
    id: '1',
    question: 'Trouver mes bureaux avec Petits Bureaux : comment ça marche ?',
  },
  {
    answer: 'Votre recherche de bureau est sans honoraires ! Nous nous rémunérons selon un modèle d\'apport d\'affaires au succès et auprès de nos partenaires qui commercialisent des bureaux.',
    id: '2',
    question: 'Combien ça coûte ?',
  },
  {
    answer: 'Petits Bureaux est l\'unique combinaison du numérique et du conseil : en cherchant des bureaux avec Petits Bureaux, vous vous appuyez sur le seul site où l\'offre de bureaux est mise à jour en temps réel et sur des fonctionnalités poussées pensées pour centraliser votre recherche. Vous faites aussi équipe avec nos experts qui vous éclairent sur le marché.',
    id: '3',
    question: 'Pourquoi faire équipe avec Petits Bureaux pour trouver mes bureaux ?',
  },
  {
    answer: 'Tous les bureaux sont sur Petits Bureaux : nos offres vont de l\'Open Space à l\'espace totalement indépendant en passant par le bureau privé tout équipé. Ces bureaux sont proposés par des espaces de coworking ou des entreprises classiques. Dans la plupart des cas, Petits Bureaux préconise les bureaux commercialisés en contrat de prestation de service car il est plus flexible que le bail 3/6/9. Nos experts vous accompagnent aussi sur les autres modalités contractuelles : prix, préavis, engagement.',
    id: '4',
    question: 'Quels types de bureaux vais-je trouver sur Petits Bureaux ? Et à quelles conditions contractuelles ?',
  },
  {
    answer: 'Le "bureau opéré" est un terme lancé par Petits Bureaux à l\'occasion de sa première édition de PetitBureauxdata en 2021 et adopté par l\'ensemble du marché. Un bureau opéré est un espace de travail indépendant dédié à une unique entreprise dès l\'accueil, incluant de nombreux services et commercialisé via un contrat de prestation de service flexible.',
    id: '5',
    question: 'Qu\'est ce qu\'un "bureau opéré" ?',
  },
  {
    answer: 'Petits Bureaux participe depuis 10 ans à l\'évolution de l\'immobilier d\'entreprise en promouvant les solutions émergentes les plus intéressantes pour vous comme le contrat de prestation de service, le coworking, la "sous-loc" (location auprès d\'une entreprise classique) ou encore le "bureau opéré". En tant que startup de la Proptech, Petits Bureaux facilite la lisibilité, la compréhension et l\'accès à l\'offre de bureau flexible. Petits Bureaux transforme votre recherche de bureaux en expérience transparente au sein du secteur de l\'immobilier d\'entreprise traditionnellement opaque.',
    id: '6',
    question: 'Quelle est la place de Petits Bureaux dans l\'immobilier d\'entreprise ?',
  },
];
</script>
