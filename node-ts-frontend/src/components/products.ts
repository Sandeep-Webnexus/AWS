// src/api/products.ts
import axios from 'axios';
import { Product } from '../types/Product';

const API_URL = 'http://localhost:5000/api/products';

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await axios.get(API_URL);
  return response.data.data;
};

export const createProduct = async (product: Product): Promise<Product> => {
  const response = await axios.post(API_URL, product);
  return response.data.data;
};

export const updateProduct = async (id: number, product: Product): Promise<Product> => {
  const response = await axios.put(`${API_URL}/${id}`, product);
  return response.data.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
