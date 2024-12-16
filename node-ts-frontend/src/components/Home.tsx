// src/components/Home.tsx
import React, { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../components/products';
import Modal from 'react-modal';

// Initialize modal
Modal.setAppElement('#root');

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock_quantity: 0,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const fetchedProducts = await getAllProducts();
    setProducts(fetchedProducts);
  };

  const handleAddProduct = () => {
    setNewProduct({
      id: 0,
      name: '',
      description: '',
      price: 0,
      stock_quantity: 0,
    });
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setNewProduct(product);
    setModalOpen(true);
  };

  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id);
    fetchProducts();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProduct) {
      await updateProduct(selectedProduct.id, newProduct);
    } else {
      await createProduct(newProduct);
    }
    setModalOpen(false);
    fetchProducts();
  };

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={handleAddProduct}
        className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
      >
        Add Product
      </button>
      <table className="min-w-full table-auto bg-white border border-gray-300 shadow-md rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Stock Quantity</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-4 py-2 border">{product.name}</td>
              <td className="px-4 py-2 border">{product.description}</td>
              <td className="px-4 py-2 border">${product.price}</td>
              <td className="px-4 py-2 border">{product.stock_quantity}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="text-blue-500 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Add/Edit Product */}
      <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} className="modal">
        <h2 className="text-2xl mb-4">{selectedProduct ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <input
              id="description"
              type="text"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input
              id="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="stock_quantity" className="block text-sm font-medium text-gray-700">Stock Quantity</label>
            <input
              id="stock_quantity"
              type="number"
              value={newProduct.stock_quantity}
              onChange={(e) => setNewProduct({ ...newProduct, stock_quantity: Number(e.target.value) })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-md">
              {selectedProduct ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Home;
