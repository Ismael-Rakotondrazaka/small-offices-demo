export interface PaginationDTO {
  count: number;
  links: PaginationDTOLinks;
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface PaginationDTOLinks {
  current: string;
  first: string;
  last: string;
  next: null | string;
  previous: null | string;
}
