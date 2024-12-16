import React, { useState, useEffect } from "react";
import { Product } from "../types/product";
import { getProducts, deleteProduct } from "../services/productService";
import ProductItem from "./ProductItem";
import { ApiResponse } from "../types/apiResponse"; // Import ApiResponse type

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const data: ApiResponse<Product[]> = await getProducts();

      if (data && data.status === "success" && Array.isArray(data.data)) {
        setProducts(data.data);
      } else {
        console.error("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product); // Set the product to be edited
    setIsEditMode(true); // Trigger the edit mode (e.g., open the modal)
  };

  const handleCloseModal = () => {
    setIsEditMode(false);
    setSelectedProduct(null); // Clear selected product when closing the modal
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onDelete={handleDelete}
              onEdit={handleEdit} // Pass handleEdit as a prop
            />
          ))}
        </tbody>
      </table>

      {/* Edit Modal (Example) */}
      {isEditMode && selectedProduct && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <form>
              <input
                type="text"
                value={selectedProduct.name}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    name: e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: +e.target.value,
                  })
                }
                className="w-full border p-2 rounded mt-2"
              />
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  // Add update logic here
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
