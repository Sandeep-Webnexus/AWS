import React from 'react';
import { Product } from "../types/product";  // Assuming you have a Product type

interface ProductItemProps {
  product: Product;
  onDelete: (id: number) => void;
  onEdit: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onDelete, onEdit }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow rounded-md">
      <div>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p>{product.description}</p>
        <p className="text-gray-500">Price: ${product.price}</p>
        <p className="text-gray-500">Stock: {product.stock_quantity}</p>
      </div>
      <div className="space-x-2">
        <button
          className="bg-green-500 text-white py-1 px-3 rounded"
          onClick={() => onEdit(product)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white py-1 px-3 rounded"
          onClick={() => onDelete(product.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
