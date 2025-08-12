import type { Pagination } from '~~/server/core/paginations/pagination';

export abstract class PaginationDTOMapper {
  static toDTO(pagination: Pagination, count: number): PaginationDTO {
    return {
      count,
      links: {
        current: pagination.links.current,
        first: pagination.links.first,
        last: pagination.links.last,
        next: pagination.links.next,
        previous: pagination.links.previous,
      },
      page: pagination.page,
      pageSize: pagination.pageSize,
      totalCount: pagination.totalCount,
      totalPages: pagination.totalPages,
    };
  }
}
