import { describe, expect, it } from 'vitest';

import { Pagination, PaginationLinks } from '../../../../server/core/paginations/pagination';

describe('Pagination', () => {
  it('should create pagination with correct properties', () => {
    const pagination = new Pagination({
      page: 2,
      pageSize: 10,
      path: '/api/items',
      totalCount: 25,
    });

    expect(pagination.page).toBe(2);
    expect(pagination.pageSize).toBe(10);
    expect(pagination.totalCount).toBe(25);
    expect(pagination.totalPages).toBe(3);
    expect(pagination.offset).toBe(10);
  });

  it('should calculate offset correctly', () => {
    const pagination = new Pagination({
      page: 1,
      pageSize: 20,
      path: '/api/items',
      totalCount: 100,
    });

    expect(pagination.offset).toBe(0);

    const pagination2 = new Pagination({
      page: 3,
      pageSize: 15,
      path: '/api/items',
      totalCount: 100,
    });

    expect(pagination2.offset).toBe(30);
  });

  it('should calculate total pages correctly', () => {
    const pagination = new Pagination({
      page: 1,
      pageSize: 10,
      path: '/api/items',
      totalCount: 25,
    });

    expect(pagination.totalPages).toBe(3);
  });

  it('should handle exact division for total pages', () => {
    const pagination = new Pagination({
      page: 1,
      pageSize: 10,
      path: '/api/items',
      totalCount: 20,
    });

    expect(pagination.totalPages).toBe(2);
  });

  it('should handle zero total count', () => {
    const pagination = new Pagination({
      page: 1,
      pageSize: 10,
      path: '/api/items',
      totalCount: 0,
    });

    expect(pagination.totalPages).toBe(0);
    expect(pagination.offset).toBe(0);
  });

  it('should handle large page numbers', () => {
    const pagination = new Pagination({
      page: 100,
      pageSize: 5,
      path: '/api/items',
      totalCount: 1000,
    });

    expect(pagination.offset).toBe(495);
    expect(pagination.totalPages).toBe(200);
  });
});

describe('PaginationLinks', () => {
  it('should generate correct links for first page', () => {
    const links = new PaginationLinks({
      page: 1,
      pageSize: 10,
      path: '/api/items',
      totalCount: 25,
      totalPages: 3,
    });

    expect(links.current).toBe('/api/items?pageSize=10&page=1');
    expect(links.first).toBe('/api/items?pageSize=10&page=1');
    expect(links.last).toBe('/api/items?pageSize=10&page=3');
    expect(links.previous).toBeNull();
    expect(links.next).toBe('/api/items?pageSize=10&page=2');
  });

  it('should generate correct links for middle page', () => {
    const links = new PaginationLinks({
      page: 2,
      pageSize: 10,
      path: '/api/items',
      totalCount: 25,
      totalPages: 3,
    });

    expect(links.current).toBe('/api/items?pageSize=10&page=2');
    expect(links.first).toBe('/api/items?pageSize=10&page=1');
    expect(links.last).toBe('/api/items?pageSize=10&page=3');
    expect(links.previous).toBe('/api/items?pageSize=10&page=1');
    expect(links.next).toBe('/api/items?pageSize=10&page=3');
  });

  it('should generate correct links for last page', () => {
    const links = new PaginationLinks({
      page: 3,
      pageSize: 10,
      path: '/api/items',
      totalCount: 25,
      totalPages: 3,
    });

    expect(links.current).toBe('/api/items?pageSize=10&page=3');
    expect(links.first).toBe('/api/items?pageSize=10&page=1');
    expect(links.last).toBe('/api/items?pageSize=10&page=3');
    expect(links.previous).toBe('/api/items?pageSize=10&page=2');
    expect(links.next).toBeNull();
  });

  it('should handle single page results', () => {
    const links = new PaginationLinks({
      page: 1,
      pageSize: 10,
      path: '/api/items',
      totalCount: 5,
      totalPages: 1,
    });

    expect(links.current).toBe('/api/items?pageSize=10&page=1');
    expect(links.first).toBe('/api/items?pageSize=10&page=1');
    expect(links.last).toBe('/api/items?pageSize=10&page=1');
    expect(links.previous).toBeNull();
    expect(links.next).toBeNull();
  });

  it('should preserve existing query parameters', () => {
    const links = new PaginationLinks({
      page: 2,
      pageSize: 10,
      path: '/api/items?search=test&sort=name',
      totalCount: 25,
      totalPages: 3,
    });

    expect(links.current).toBe('/api/items?search=test&sort=name&pageSize=10&page=2');
    expect(links.first).toBe('/api/items?search=test&sort=name&pageSize=10&page=1');
    expect(links.last).toBe('/api/items?search=test&sort=name&pageSize=10&page=3');
    expect(links.previous).toBe('/api/items?search=test&sort=name&pageSize=10&page=1');
    expect(links.next).toBe('/api/items?search=test&sort=name&pageSize=10&page=3');
  });

  it('should handle complex URLs with hash and query', () => {
    const links = new PaginationLinks({
      page: 2,
      pageSize: 10,
      path: '/api/items?filter=active#section',
      totalCount: 25,
      totalPages: 3,
    });

    expect(links.current).toBe('/api/items?filter=active&pageSize=10&page=2');
    expect(links.first).toBe('/api/items?filter=active&pageSize=10&page=1');
    expect(links.last).toBe('/api/items?filter=active&pageSize=10&page=3');
  });

  it('should handle URLs with existing page parameter', () => {
    const links = new PaginationLinks({
      page: 2,
      pageSize: 10,
      path: '/api/items?page=1&search=test',
      totalCount: 25,
      totalPages: 3,
    });

    expect(links.current).toBe('/api/items?page=2&search=test&pageSize=10');
    expect(links.first).toBe('/api/items?page=1&search=test&pageSize=10');
    expect(links.last).toBe('/api/items?page=3&search=test&pageSize=10');
  });

  it('should handle URLs with existing pageSize parameter', () => {
    const links = new PaginationLinks({
      page: 2,
      pageSize: 10,
      path: '/api/items?pageSize=5&search=test',
      totalCount: 25,
      totalPages: 3,
    });

    expect(links.current).toBe('/api/items?pageSize=10&search=test&page=2');
    expect(links.first).toBe('/api/items?pageSize=10&search=test&page=1');
    expect(links.last).toBe('/api/items?pageSize=10&search=test&page=3');
  });

  it('should handle edge case with zero total count', () => {
    const links = new PaginationLinks({
      page: 1,
      pageSize: 10,
      path: '/api/items',
      totalCount: 0,
      totalPages: 0,
    });

    expect(links.current).toBe('/api/items?pageSize=10&page=1');
    expect(links.first).toBe('/api/items?pageSize=10&page=1');
    expect(links.last).toBe('/api/items?pageSize=10&page=0');
    expect(links.previous).toBeNull();
    expect(links.next).toBeNull();
  });

  it('should handle large page numbers', () => {
    const links = new PaginationLinks({
      page: 100,
      pageSize: 5,
      path: '/api/items',
      totalCount: 1000,
      totalPages: 200,
    });

    expect(links.current).toBe('/api/items?pageSize=5&page=100');
    expect(links.first).toBe('/api/items?pageSize=5&page=1');
    expect(links.last).toBe('/api/items?pageSize=5&page=200');
    expect(links.previous).toBe('/api/items?pageSize=5&page=99');
    expect(links.next).toBe('/api/items?pageSize=5&page=101');
  });

  it('should handle special characters in query parameters', () => {
    const links = new PaginationLinks({
      page: 2,
      pageSize: 10,
      path: '/api/items?search=test+space&filter=active=true',
      totalCount: 25,
      totalPages: 3,
    });

    expect(links.current).toBe('/api/items?search=test+space&filter=active=true&pageSize=10&page=2');
    expect(links.first).toBe('/api/items?search=test+space&filter=active=true&pageSize=10&page=1');
    expect(links.last).toBe('/api/items?search=test+space&filter=active=true&pageSize=10&page=3');
  });
});
