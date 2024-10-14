export interface IPagination {
  totalPages: number;
  previousPage: number | null;
  currentPage: number;
  nextPage: number | null;
  totalItems: number;
}

export interface IBaseQueryParams {
  API_KEY: string;
}
