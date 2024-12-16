import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController';
const router = express.Router();
// Routes for CRUD operations
router.post('/', createProduct); // Apply validation middleware
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct); // Apply validation middleware
router.delete('/:id', deleteProduct);
export default router;
