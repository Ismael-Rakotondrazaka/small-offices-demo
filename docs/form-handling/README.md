# Form Handling with Naive UI & VeeValidate

This section covers how to implement forms using **Naive UI** components with **VeeValidate** for validation in the Small Offices Demo project.

## 📋 Table of Contents

- [Overview](#overview)
- [Form Architecture](#form-architecture)
- [Validation Setup](#validation-setup)
- [Naive UI Integration](#naive-ui-integration)
- [Post Creation Example](#post-creation-example)
- [Form Patterns](#form-patterns)
- [Best Practices](#best-practices)

## 🔍 Overview

The project uses a combination of:

- **VeeValidate** - Form validation library with Zod integration
- **Naive UI** - Vue 3 component library
- **Zod** - Schema validation for TypeScript
- **Generated Types** - Auto-generated from Prisma models

This creates a type-safe, validated form system that integrates seamlessly with the generated API endpoints.

## 🏗️ Form Architecture

### Core Dependencies

```typescript
// Key packages used for forms
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
```

### Form Structure

```
Form Component
├── VeeValidate (useForm)
├── Zod Schema (validation)
├── Naive UI Components
├── Generated Types (from CLI)
└── API Integration
```

## ✅ Validation Setup

### 1. Zod Schema Definition

Zod schemas are automatically generated from Prisma models and provide type-safe validation:

```typescript
// shared/domains/posts/storePostRequest.ts
export const StorePostRequestBodySchema = z.object({
  content: z.string(),
  imageId: z.string().nullable().optional(),
});

export type StorePostRequestBody = z.infer<typeof StorePostRequestBodySchema>;
```

### 2. VeeValidate Integration

```typescript
// app/pages/posts/create.vue
const {
  defineField,
  errors,
  handleSubmit,
  isSubmitting: isStorePostPending,
  resetForm,
  setErrors,
  setFieldValue,
} = useForm({
  initialValues: {
    content: '',
    imageId: null,
  },
  validationSchema: toTypedSchema(StorePostRequestBodySchema),
});
```

### 3. Field Definition

```typescript
const [content, contentProps] = defineField('content', makeInputProps<string>);
const [imageId] = defineField('imageId', makeInputProps<null | string>);
```

## 🎨 Naive UI Integration

### Form Components

The project uses Naive UI components with VeeValidate integration:

```vue
<template>
  <n-form id="create-post-form">
    <n-form-item
      label="Content"
      required
      v-bind="contentProps"
    >
      <n-input
        v-model:value="content"
        type="textarea"
        show-count
        placeholder="Enter content"
      />
    </n-form-item>
  </n-form>
</template>
```

### Input Props Helper

The `makeInputProps` utility creates consistent props for Naive UI form items:

```typescript
// app/utils/forms/makeInputProps.ts
export const makeInputProps = <T>(fieldName: string) => ({
  name: fieldName,
  path: fieldName,
  validateOnBlur: true,
  validateOnChange: true,
});
```

## 📝 Post Creation Example

Let's examine the complete post creation form from `app/pages/posts/create.vue`:

### 1. Template Structure

```vue
<template>
  <div class="mx-auto w-full max-w-2xl p-3">
    <n-h1>Create a post</n-h1>

    <n-form id="create-post-form">
      <!-- Content Field -->
      <n-form-item
        label="Content"
        required
        v-bind="contentProps"
      >
        <n-input
          v-model:value="content"
          type="textarea"
          show-count
          placeholder="Enter content"
        />
      </n-form-item>

      <!-- Image Upload -->
      <n-p>Image</n-p>
      <n-upload
        action="https://naive-upload.free.beeceptor.com/"
        :max="1"
        list-type="image-card"
        :custom-request="customMediaUploadRequest"
        :accept="mediaConfig.IMAGE_FORM_ACCEPT"
        :on-remove="handleRemove"
      >
        <n-button>
          Upload image
        </n-button>
      </n-upload>
      
      <!-- Error Display -->
      <n-text v-if="errors.imageId" type="error">
        {{ errors.imageId }}
      </n-text>

      <!-- Submit Button -->
      <n-button
        class="mt-5"
        type="primary"
        :disabled="isStoreMediaStatusPending"
        :pending="isStorePostPending"
        @click="handleStorePost"
      >
        Publish
      </n-button>
    </n-form>
  </div>
</template>
```

### 2. Script Setup

```vue
<script setup lang="ts">
import type { UploadCustomRequestOptions } from 'naive-ui';

defineOgImageComponent('DefaultOgImage');

definePageMeta({
  middleware: 'auth',
});

const localeRoute = useLocaleRoute();

// Form Setup
const {
  defineField,
  errors,
  handleSubmit,
  isSubmitting: isStorePostPending,
  resetForm,
  setErrors,
  setFieldValue,
} = useForm({
  initialValues: {
    content: '',
    imageId: null,
  },
  validationSchema: toTypedSchema(StorePostRequestBodySchema),
});

// Field Definitions
const [content, contentProps] = defineField('content', makeInputProps<string>);
const [imageId] = defineField('imageId', makeInputProps<null | string>);

// Media Upload Functions
const prepareUploadBody = (_file: File): GetMediaUploadUrlRequestBody => ({
  file: {
    lastModified: _file.lastModified,
    name: _file.name,
    size: _file.size,
    type: _file.type,
  },
});

const getUploadUrl = async (body: GetMediaUploadUrlRequestBody) => {
  return await $fetch('/api/media/upload-url', {
    body,
    method: 'POST',
  });
};

const uploadFileToUrl = async (uploadUrl: string, _file: File) => {
  await $fetch(uploadUrl, {
    body: _file,
    headers: {
      'Content-Type': _file.type,
    },
    method: 'PUT',
  });
};

const confirmUpload = async (
  fileMetaData: ConfirmMediaUploadRequestBody['fileMetaData'],
) => {
  return $fetch('/api/media/confirm-upload', {
    body: {
      fileMetaData,
    },
    method: 'POST',
  });
};

// Custom Upload Handler
const isStoreMediaStatusPending = ref(false);
const customMediaUploadRequest = async ({
  file: _file,
  onError,
  onFinish,
}: UploadCustomRequestOptions) => {
  isStoreMediaStatusPending.value = true;
  try {
    if (!_file.file) {
      return;
    }

    const body = prepareUploadBody(_file.file);
    const { fileMetaData, uploadUrl } = await getUploadUrl(body);
    await uploadFileToUrl(uploadUrl, _file.file);
    const mediaResponse = await confirmUpload(fileMetaData);
    imageId.value = mediaResponse.media.id;

    onFinish();
    message.success(t('home.upload.success'));
  }
  catch (error) {
    onError();
    handleFetchError(error, t, message, setErrors);
  }
  isStoreMediaStatusPending.value = false;
};

// Form Handlers
const handleRemove = () => {
  setFieldValue('imageId', undefined);
};

const handleStorePost = handleSubmit(async (values) => {
  try {
    const responseData = await $fetch('/api/posts', {
      body: values,
      headers: headers.value,
      method: 'POST',
    });

    resetForm();
    navigateTo(
      localeRoute({
        name: 'posts-id',
        params: {
          id: responseData.data.id,
        },
      }),
    );
  }
  catch (error) {
    handleFetchError<StorePostRequest>(error, t, message, setErrors);
  }
});

// Internationalization
const { locale, t } = useI18n({
  useScope: 'global',
});

const headers = computed(() => ({
  'accept-language': locale.value,
}));

const message = useMessage();
</script>
```

## 🔄 Form Patterns

### 1. Basic Text Input

```vue
<n-form-item label="Title" required v-bind="titleProps">
  <n-input
    v-model:value="title"
    :placeholder="'Enter title'"
  />
</n-form-item>
```

### 2. Textarea with Character Count

```vue
<n-form-item label="Content" required v-bind="contentProps">
  <n-input
    v-model:value="content"
    type="textarea"
    show-count
    :placeholder="'Enter content'"
  />
</n-form-item>
```

### 3. File Upload

```vue
<n-upload
  :max="1"
  list-type="image-card"
  :custom-request="customUploadRequest"
  :accept="'image/*'"
  :on-remove="handleRemove"
>
  <n-button>Upload Image</n-button>
</n-upload>
```

### 4. Select Dropdown

```vue
<n-form-item label="Category" required v-bind="categoryProps">
  <n-select
    v-model:value="category"
    :options="categoryOptions"
    placeholder="Select category"
  />
</n-form-item>
```

### 5. Error Display

```vue
<n-text v-if="errors.fieldName" type="error">
  {{ errors.fieldName }}
</n-text>
```

## 🎯 Best Practices

### 1. Form Structure

- Use `useForm` from VeeValidate for form state management
- Define fields with `defineField` for type safety
- Use generated Zod schemas for validation
- Implement proper error handling

### 2. Validation

```typescript
// Use generated schemas
validationSchema: toTypedSchema(StorePostRequestBodySchema)

// Custom validation if needed
const customSchema = z.object({
  content: z.string().min(10, 'Content must be at least 10 characters'),
  imageId: z.string().optional(),
});
```

### 3. File Upload

- Implement custom upload handlers for complex upload flows
- Handle upload states properly (pending, success, error)
- Update form values after successful upload
- Provide user feedback for upload progress

### 4. Error Handling

```typescript
// Use the handleFetchError utility
catch (error) {
  handleFetchError<StorePostRequest>(error, t, message, setErrors);
}
```

### 5. Form Submission

```typescript
// Use handleSubmit for form submission
const handleStorePost = handleSubmit(async (values) => {
  // Submit logic here
  const response = await $fetch('/api/posts', {
    body: values,
    method: 'POST',
  });
  
  // Handle success
  resetForm();
  navigateTo('/posts/' + response.data.id);
});
```

## 🔧 Advanced Patterns

### 1. Conditional Fields

```vue
<n-form-item v-if="showImageUpload" label="Image" v-bind="imageProps">
  <n-upload :custom-request="uploadHandler" />
</n-form-item>
```

### 2. Dynamic Validation

```typescript
const dynamicSchema = computed(() => 
  z.object({
    content: z.string(),
    imageId: showImageUpload.value 
      ? z.string().min(1, 'Image is required')
      : z.string().optional(),
  })
);
```

### 3. Form Reset

```typescript
const handleReset = () => {
  resetForm();
  setFieldValue('imageId', null);
};
```

## 🚀 Integration with Generated Code

### 1. Using Generated Types

```typescript
// Import generated types
import type { StorePostRequestBody } from '#shared/domains/posts/storePostRequest';

// Use in form
const initialValues: StorePostRequestBody = {
  content: '',
  imageId: null,
};
```

### 2. Using Generated Schemas

```typescript
// Import generated schema
import { StorePostRequestBodySchema } from '#shared/domains/posts/storePostRequest';

// Use for validation
validationSchema: toTypedSchema(StorePostRequestBodySchema)
```

### 3. API Integration

```typescript
// Submit to generated API endpoint
const response = await $fetch('/api/posts', {
  body: values,
  method: 'POST',
});
```

## 🔗 Related Documentation

- [Database Models](./../database-models/README.md) - Learn about the data models
- [Code Generation](./../code-generation/README.md) - See how types are generated

## 📚 External Resources

- [VeeValidate Documentation](https://vee-validate.logaretm.com/v4/)
- [Naive UI Documentation](https://www.naiveui.com/)
- [Zod Documentation](https://zod.dev/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html) 