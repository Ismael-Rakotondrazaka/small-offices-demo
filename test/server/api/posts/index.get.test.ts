import { $fetch, setup } from '@nuxt/test-utils/e2e';
import { withQuery } from 'ufo';
import { beforeEach, describe, expect, it } from 'vitest';

import { resetDatabase, seedDatabase } from '../../../../test/utils/prisma';

await setup({
  host: import.meta.env.VITE_PUBLIC_APP_URL,
});

beforeEach(() => {
  resetDatabase(import.meta.env.VITE_DATABASE_URL);
});

describe('GET /api/posts', () => {
  it('should return an empty list when no posts exist', async () => {
    const result = await $fetch('/api/posts');

    expect(Object.keys(result).sort()).toEqual(['posts', 'pagination'].sort());
    expect(result.posts).toStrictEqual([]);
  });

  it('should return a paginated list of posts after seeding', async () => {
    seedDatabase(import.meta.env.VITE_DATABASE_URL);

    const result = await $fetch('/api/posts');

    expect(Object.keys(result).sort()).toEqual(['posts', 'pagination'].sort());
    expect(result.posts).toBeInstanceOf(Array);
    expect(result.posts.length).toBeGreaterThan(0);

    expect(result.posts).to.be.an('array');
    result.posts.forEach((post) => {
      expect(post).toMatchObject({
        content: expect.any(String),
        id: expect.any(String),
      });
    });
  });

  it('should return a list with a working pagination', async () => {
    seedDatabase(import.meta.env.VITE_DATABASE_URL);

    const pageSize = 3;

    const page1 = await $fetch('/api/posts', {
      query: {
        page: 1,
        pageSize,
      },
    });

    expect(page1.posts.length).toStrictEqual(pageSize);
    expect(page1.pagination.count).toStrictEqual(pageSize);

    const page2 = await $fetch(page1.pagination.links.next! as '/api/posts');
    expect(page1.posts.length).toStrictEqual(pageSize);
    expect(page1.pagination.count).toStrictEqual(pageSize);

    const sameAsPage1 = await $fetch(
      page2.pagination.links.previous! as '/api/posts',
    );

    expect(sameAsPage1).toStrictEqual(page1);
  });

  it('should return a list of posts align with queries', async () => {
    seedDatabase(import.meta.env.VITE_DATABASE_URL);

    /* ---------------------------- content[contains] --------------------------- */
    const containsValue = 'lorem';
    const containsUrl = withQuery('/api/posts', {
      'content[contains]': containsValue,
    });

    const withContainsResult = await $fetch(containsUrl as '/api/posts');

    withContainsResult.posts.forEach((post) => {
      expect(post.content.toLowerCase()).contain(containsValue.toLowerCase());
    });

    /* ------------------------- orderBy[createdAt]=asc ------------------------- */

    const orderByCreatedAtAscUrl = withQuery('/api/posts', {
      'orderBy[createdAt]': 'asc',
      'pageSize': 5,
    }) as '/api/posts';

    const withOrderByCreatedAtAscResult = await $fetch(orderByCreatedAtAscUrl);

    const withOrderByCreatedAtAscTimestamps
      = withOrderByCreatedAtAscResult.posts.map(post =>
        new Date(post.createdAt).getTime(),
      );

    expect(
      withOrderByCreatedAtAscTimestamps.toSorted((a, b) => a - b),
    ).toStrictEqual(withOrderByCreatedAtAscTimestamps);

    /* ------------------------- orderBy[createdAt]=desc ------------------------ */

    const orderByCreatedAtDescUrl = withQuery('/api/posts', {
      'orderBy[createdAt]': 'desc',
      'pageSize': 5,
    }) as '/api/posts';

    const withOrderByCreatedAtDescResult = await $fetch(
      orderByCreatedAtDescUrl,
    );

    const withOrderByCreatedAtDescTimestamps
      = withOrderByCreatedAtDescResult.posts.map(post =>
        new Date(post.createdAt).getTime(),
      );

    expect(
      withOrderByCreatedAtDescTimestamps.toSorted((a, b) => b - a),
    ).toStrictEqual(withOrderByCreatedAtDescTimestamps);
  });
});
