<template>
  <div class="w-full">
    <n-collapse class="mb-5">
      <n-collapse-item
        title="Instructions"
        name="instructions"
      >
        <n-p>
          Importez un fichier CSV avec les colonnes suivantes :
        </n-p>
        <n-table>
          <thead>
            <tr>
              <th>Colonne</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>title</strong></td>
              <td>Titre du bureau (obligatoire)</td>
            </tr>
            <tr>
              <td><strong>type</strong></td>
              <td>Type de bureau : INDEPENDENT_SPACE, OPEN_SPACE ou PRIVATE_OFFICE (obligatoire)</td>
            </tr>
            <tr>
              <td><strong>arr</strong></td>
              <td>Numéro d'arrondissement 1-20 (obligatoire)</td>
            </tr>
            <tr>
              <td><strong>posts</strong></td>
              <td>Nombre de postes de travail (obligatoire)</td>
            </tr>
            <tr>
              <td><strong>price</strong></td>
              <td>Loyer mensuel en euros (obligatoire)</td>
            </tr>
            <tr>
              <td><strong>lat</strong></td>
              <td>Latitude (obligatoire)</td>
            </tr>
            <tr>
              <td><strong>lng</strong></td>
              <td>Longitude (obligatoire)</td>
            </tr>
            <tr>
              <td><strong>isFake</strong></td>
              <td>true/false pour indiquer un faux bureau (optionnel, défaut : false)</td>
            </tr>
          </tbody>
        </n-table>
      </n-collapse-item>
    </n-collapse>

    <n-upload
      :max="1"
      accept=".csv"
      :custom-request="handleFileUpload"
      :show-file-list="true"
      class="mb-5"
      @remove="handleFileRemove"
    >
      <n-upload-dragger>
        <div style="margin-bottom: 12px">
          <Icon
            name="mdi:office-building-plus"
            size="2rem"
          />
        </div>
        <n-text style="font-size: 16px">
          Cliquez ou glissez un fichier CSV ici pour l'importer
        </n-text>
        <n-p
          depth="3"
        >
          Seuls les fichiers CSV sont acceptés.
        </n-p>
      </n-upload-dragger>
    </n-upload>

    <div
      v-if="parsedData.length > 0"
      class="space-y-4"
    >
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold">
          Aperçu ({{ parsedData.length }} bureaux)
        </h3>
        <n-button
          type="primary"
          :loading="isCreating"
          :disabled="parsedData.length === 0"
          @click="handleBulkCreate"
        >
          <template #icon>
            <Icon name="mdi:content-save" />
          </template>
          Créer {{ parsedData.length }} bureaux
        </n-button>
      </div>

      <n-data-table
        :columns="columns"
        :data="parsedData"
        :pagination="pagination"
        :bordered="false"
        size="small"
      />
    </div>

    <div
      v-if="results"
      class="space-y-4"
    >
      <n-alert
        :type="results.count > 0 ? 'success' : 'warning'"
        :title="results.count > 0 ? 'Succès' : 'Succès partiel'"
      >
        <template #default>
          <div class="space-y-2">
            <p>Créés : {{ results.count }} bureaux</p>
          </div>
        </template>
      </n-alert>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OfficeType } from '~~/shared/domains/offices';
import type { DataTableColumns, UploadCustomRequestOptions } from 'naive-ui';

import { OfficeTypeLabel } from '~~/shared/domains/offices';
import Papa from 'papaparse';

type Emits = {
  'office:bulk-created': [number];
};
const emit = defineEmits<Emits>();

interface BulkCreateResults {
  count: number;
}
type ParsedOffice = BulkStoreOfficeRequestBody['offices'][number];

const message = useMessage();

const parsedData = ref<ParsedOffice[]>([]);
const isCreating = ref(false);
const results = ref<BulkCreateResults | null>(null);

const pagination = {
  pageSize: 10,
};

const columns: DataTableColumns<ParsedOffice> = [
  {
    key: 'title',
    title: 'Titre',
  },
  {
    key: 'type',
    render: row => OfficeTypeLabel[row.type as OfficeType] || row.type,
    title: 'Type',
  },
  {
    key: 'arr',
    title: 'Arrondissement',
  },
  {
    key: 'posts',
    title: 'Postes',
  },
  {
    key: 'price',
    render: row => `${row.price}€`,
    title: 'Prix',
  },
  {
    key: 'location',
    render: row => `${row.lat.toFixed(4)}, ${row.lng.toFixed(4)}`,
    title: 'Localisation',
  },
  {
    key: 'isFake',
    render: row => row.isFake ? 'Oui' : 'Non',
    title: 'Faux',
  },
];

const handleFileUpload = async ({ file, onError, onFinish }: UploadCustomRequestOptions) => {
  try {
    if (!file.file) {
      onError();
      return;
    }

    // @ts-expect-error - file.file is not assignable to symbol
    Papa.parse(file.file, {
      complete: (parseResults) => {
        if (parseResults.errors.length > 0) {
          console.error('Erreurs de parsing CSV :', parseResults.errors);
          message.error('Erreur lors de l’analyse du fichier CSV. Veuillez vérifier le format.');
          onError();
          return;
        }

        const records = parseResults.data as Record<string, string>[];

        if (records.length === 0) {
          message.error('Le fichier CSV est vide');
          onError();
          return;
        }

        const parsedOffices: ParsedOffice[] = records.map(record => ({
          arr: parseInt(record.arr || '1') || 1,
          isFake: record.isFake === 'true',
          lat: parseFloat(record.lat || '0') || 0,
          lng: parseFloat(record.lng || '0') || 0,
          posts: parseInt(record.posts || '1') || 1,
          price: parseFloat(record.price || '0') || 0,
          title: record.title || '',
          type: record.type as OfficeType,
        }));

        parsedData.value = parsedOffices;
        results.value = null;
        onFinish();
        message.success(`Import de ${parsedOffices.length} bureaux depuis le CSV réussi`);
      },
      error: (parseError: unknown) => {
        console.error('Erreur de parsing CSV :', parseError);
        message.error('Erreur lors de l’analyse du fichier CSV. Veuillez vérifier le format.');
        onError();
      },
      header: true,
      quoteChar: '\'', // Tell parser to use single quotes
      skipEmptyLines: true,
      trim: true,
      trimHeaders: true,
    });
  }
  catch (error) {
    console.error('Erreur lors de la lecture du fichier :', error);
    message.error('Erreur lors de la lecture du fichier CSV.');
    onError();
  }
};

const handleBulkCreate = async () => {
  if (parsedData.value.length === 0) return;

  isCreating.value = true;
  results.value = null;

  try {
    const body: BulkStoreOfficeRequestBody = {
      offices: parsedData.value,
    };

    const response = await $fetch('/api/offices/bulk', {
      body,
      method: 'POST',
    });

    results.value = response;

    if (response.count > 0) {
      emit('office:bulk-created', response.count);

      message.success(`${response.count} bureaux créés avec succès`);
    }
  }
  catch (error) {
    console.error('Erreur lors de la création des bureaux :', error);
    message.error('Erreur lors de la création des bureaux. Veuillez vérifier les données et réessayer.');
  }
  finally {
    isCreating.value = false;
  }
};

const handleFileRemove = () => {
  parsedData.value = [];
  results.value = null;
};
</script>

<style scoped></style>
