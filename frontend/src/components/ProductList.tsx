import React, { useState, useEffect } from "react";
import { Product } from "../types/product";
import {
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../services/productService";
import { ApiResponse } from "../types/apiResponse";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState({
    id: 0,
    name: "",
    description: "",
    price: 0,
    stock_quantity: 0,
  });
  const [formError, setFormError] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data: ApiResponse<Product[]> = await getProducts();
        if (data && data.status === "success" && Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          setError("Failed to load products.");
        }
      } catch (error) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data: ApiResponse<Product[]> = await getProducts();
      if (data && data.status === "success" && Array.isArray(data.data)) {
        setProducts(data.data);
      } else {
        setError("Failed to load products.");
      }
    } catch (error) {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    setProducts(products.filter((product) => product.id !== id));
  };

  const validateForm = (): boolean => {
    if (!newProduct.name || !newProduct.description || newProduct.price <= 0 || newProduct.stock_quantity <= 0) {
      setFormError("All fields must be filled out and price/quantity must be positive.");
      return false;
    }
    setFormError(""); // Clear any previous error
    return true;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;
    try {
      const createdProduct = await createProduct(newProduct);
      setIsPopupOpen(false);
      setNewProduct({ id: 0, name: "", description: "", price: 0, stock_quantity: 0 });
      // Reload the products list
      fetchProducts();
    } catch (error) {
      console.error("Failed to create product", error);
    }
  };
  

  const handleEdit = (product: Product) => {
    setNewProduct(product);
    setIsEditMode(true);
    setIsPopupOpen(true);
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;
    try {
      const updatedProduct = await updateProduct(newProduct.id, newProduct);
      setIsPopupOpen(false);
      setIsEditMode(false);
      setNewProduct({ id: 0, name: "", description: "", price: 0, stock_quantity: 0 });
      // Reload the products list
      fetchProducts();
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Product List</h2>
          <p className="text-gray-600 mt-2">Browse and manage the available products in your inventory.</p>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          onClick={() => {
            setIsPopupOpen(true);
            setIsEditMode(false);
            setNewProduct({ id: 0, name: "", description: "", price: 0, stock_quantity: 0 });
          }}
        >
          Add Product
        </button>
      </header>

      {/* Table Content */}
      {loading ? (
        <p className="text-center text-lg text-blue-600 font-medium">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500 font-medium">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Stock Quantity</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="py-2 px-4">{product.name}</td>
                    <td className="py-2 px-4">{product.description}</td>
                    <td className="py-2 px-4">${product.price}</td>
                    <td className="py-2 px-4">{product.stock_quantity}</td>
                    <td className="py-2 px-4">
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 mr-2"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No products available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">{isEditMode ? "Edit Product" : "Add New Product"}</h3>
            <form className="space-y-4">
              {formError && <p className="text-red-500">{formError}</p>}
              <input
                type="text"
                placeholder="Name"
                className="w-full border p-2 rounded"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <textarea
                placeholder="Description"
                className="w-full border p-2 rounded"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
              <input
                type="number"
                placeholder="Price"
                className="w-full border p-2 rounded"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: +e.target.value })}
              />
              <input
                type="number"
                placeholder="Stock Quantity"
                className="w-full border p-2 rounded"
                value={newProduct.stock_quantity}
                onChange={(e) => setNewProduct({ ...newProduct, stock_quantity: +e.target.value })}
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => setIsPopupOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={isEditMode ? handleUpdate : handleCreate}
                >
                  {isEditMode ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
