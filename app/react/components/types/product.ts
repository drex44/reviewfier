/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.32.889 on 2021-10-03 12:10:14.

export interface ProductDto {
  id: string;
  name: string;
  description: string;
  avgStars: number;
}

export interface ProductSearchRequest {
  page: number;
  pageSize: number;
}

export interface RatingDto {
  id?: string;
  productId: string;
  review: string;
  stars: number;
}

export interface WSUpdate<T> {
  updates: T[];
  additions: T[];
  deletes: T[];
}
