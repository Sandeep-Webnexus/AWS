import React, { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { createProduct, updateProduct, getProductById } from '../services/productService'; // Ensure getProductById is implemented correctly
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock_quantity: 0,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        setLoading(true); // Set loading to true when fetching
        try {
          const fetchedProduct = await getProductById(Number(id));
          if (fetchedProduct) {
            setProduct(fetchedProduct); // Set fetched product to state
          } else {
            setError('Product not found.'); // Handle the case when product is not found
          }
        } catch (error) {
          setError('Failed to fetch product details.'); // Handle fetch error
        } finally {
          setLoading(false); // Reset loading state
        }
      };

      fetchProduct();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateProduct(Number(id), product); // Update product if id exists
      } else {
        await createProduct(product); // Create new product if no id
      }
      navigate('/'); // Redirect to the main product list after submit
    } catch (error) {
      setError('Failed to save product.'); // Handle error during submit
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h2 className="text-xl font-bold">{id ? 'Edit Product' : 'Create Product'}</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>} {/* Display error messages */}

      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="Product Description"
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Product Price"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        name="stock_quantity"
        value={product.stock_quantity}
        onChange={handleChange}
        placeholder="Stock Quantity"
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        {id ? 'Update Product' : 'Create Product'}
      </button>
    </form>
  );
};

export default ProductForm;
