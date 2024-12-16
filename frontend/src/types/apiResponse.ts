// src/types/apiResponse.ts
export interface ApiResponse<T> {
    status: string;
    data: T;
  }
  