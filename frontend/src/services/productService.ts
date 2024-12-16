import axios from 'axios';
import { Product } from '../types/product';
import { ApiResponse } from '../types/apiResponse';

const apiUrl = 'http://localhost:5000/api/products';

// export const getProducts = async (): Promise<Product[]> => {
//   const response = await axios.get(apiUrl);
//   return response.data;
// };

export const getProducts = async (): Promise<ApiResponse<Product[]>> => {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;  // Should match ApiResponse<Product[]>
};

export const createProduct = async (product: Product): Promise<Product> => {
  const response = await axios.post(apiUrl, product);
  return response.data;
};

export const updateProduct = async (id: number, product: Product): Promise<Product> => {
  const response = await axios.put(`${apiUrl}/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`${apiUrl}/${id}`);
};


export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await fetch(`http://localhost:5000/api/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    const data = await response.json();
    return data;  // Returns product data in JSON format
  } catch (error) {
    throw error;  // Throw the error to be handled in ProductForm
  }
};