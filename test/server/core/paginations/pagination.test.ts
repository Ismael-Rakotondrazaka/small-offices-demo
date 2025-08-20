import { describe, expect, it } from 'vitest';

import { Pagination, PaginationLinks } from '../../../../server/core/paginations/pagination';

describe('Pagination', () => {
  describe('constructor', () => {
    it('should create pagination with correct properties', () => {
      const pagination = new Pagination({
        page: 2,
        pageSize: 10,
        path: '/api/test?filter=value',
        totalCount: 25,
      });

      expect(pagination.page).toBe(2);
      expect(pagination.pageSize).toBe(10);
      expect(pagination.totalCount).toBe(25);
      expect(pagination.totalPages).toBe(3);
      expect(pagination.offset).toBe(10);
      expect(pagination.links).toBeInstanceOf(PaginationLinks);
    });

    it('should calculate total pages correctly', () => {
      const pagination = new Pagination({
        page: 1,
        pageSize: 10,
        path: '/api/test',
        totalCount: 100,
      });

      expect(pagination.totalPages).toBe(10);
    });

    it('should handle edge case when total count is 0', () => {
      const pagination = new Pagination({
        page: 1,
        pageSize: 10,
        path: '/api/test',
        totalCount: 0,
      });

      expect(pagination.totalPages).toBe(0);
      expect(pagination.offset).toBe(0);
    });

    it('should calculate offset correctly', () => {
      const pagination = new Pagination({
        page: 3,
        pageSize: 5,
        path: '/api/test',
        totalCount: 20,
      });

      expect(pagination.offset).toBe(10);
    });
  });
});

describe('PaginationLinks', () => {
  describe('constructor', () => {
    it('should create links with correct URLs', () => {
      const links = new PaginationLinks({
        page: 2,
        pageSize: 10,
        path: '/api/test?filter=value&pageSize=10',
        totalCount: 25,
        totalPages: 3,
      });

      expect(links.current).toContain('page=2');
      expect(links.first).toContain('page=1');
      expect(links.last).toContain('page=3');
      expect(links.previous).toContain('page=1');
      expect(links.next).toContain('page=3');
      expect(links.current).toContain('filter=value');
      expect(links.current).toContain('pageSize=10');
    });

    it('should handle first page correctly', () => {
      const links = new PaginationLinks({
        page: 1,
        pageSize: 10,
        path: '/api/test',
        totalCount: 25,
        totalPages: 3,
      });

      expect(links.previous).toBeNull();
      expect(links.next).toContain('page=2');
    });

    it('should handle last page correctly', () => {
      const links = new PaginationLinks({
        page: 3,
        pageSize: 10,
        path: '/api/test',
        totalCount: 25,
        totalPages: 3,
      });

      expect(links.previous).toContain('page=2');
      expect(links.next).toBeNull();
    });

    it('should handle single page correctly', () => {
      const links = new PaginationLinks({
        page: 1,
        pageSize: 10,
        path: '/api/test',
        totalCount: 5,
        totalPages: 1,
      });

      expect(links.previous).toBeNull();
      expect(links.next).toBeNull();
      expect(links.first).toContain('page=1');
      expect(links.last).toContain('page=1');
    });

    it('should preserve existing query parameters', () => {
      const links = new PaginationLinks({
        page: 2,
        pageSize: 10,
        path: '/api/test?search=test&sort=name&pageSize=10',
        totalCount: 25,
        totalPages: 3,
      });

      expect(links.current).toContain('search=test');
      expect(links.current).toContain('sort=name');
      expect(links.current).toContain('pageSize=10');
      expect(links.current).toContain('page=2');
    });

    it('should handle path without query parameters', () => {
      const links = new PaginationLinks({
        page: 1,
        pageSize: 10,
        path: '/api/test',
        totalCount: 25,
        totalPages: 3,
      });

      expect(links.current).toBe('/api/test?pageSize=10&page=1');
      expect(links.first).toBe('/api/test?pageSize=10&page=1');
      expect(links.last).toBe('/api/test?pageSize=10&page=3');
    });
  });
});
