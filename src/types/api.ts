import { IProduct } from '../models/Product';

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginationInfo {
  total: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  pagination: PaginationInfo;
  products: T[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  error?: string | null;
}

export interface SearchQuery {
  q?: string;
  page?: number;
  limit?: number;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
} 