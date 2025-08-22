import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';

import OfficeBulkCreateForm from '../../../../app/components/office/OfficeBulkCreateForm.vue';

describe('OfficeBulkCreateForm', () => {
  it('should render the component', async () => {
    const wrapper = await mountSuspended(OfficeBulkCreateForm, {
      props: {
        lat: 48.8566,
        lng: 2.3522,
      },
      shallow: true,
    });
    expect(wrapper.exists()).toBe(true);
  });
});
