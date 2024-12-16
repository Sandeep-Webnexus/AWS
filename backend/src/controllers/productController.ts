// import { Request, Response, NextFunction } from 'express';
//import Product from '../models/Product'; // Assuming the Product model is in the models folder
//import asyncHandler from '../middleware/asyncHandler'; // Ensure this is installed

// Create Product
// export const createProduct = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const { name, description, price, stock_quantity, category_id } = req.body;

//     try {
//       const newProduct = await Product.create({
//         name,
//         description,
//         price,
//         stock_quantity,
//         category_id,
//       });

//       res.status(201).json({
//         status: 'success',
//         message: 'Product created successfully',
//         data: newProduct,
//       });
//     } catch (error) {
//       next(error); // Pass errors to the error handler middleware
//     }
//   }
// );

// Get all Products (Exclude deleted)
// export const getAllProducts = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const products = await Product.findAll({
//         where: { deleted_at: null }, // Exclude soft-deleted products
//       });
//       res.status(200).json({
//         status: 'success',
//         data: products,
//       });
//     } catch (error) {
//       next(error); // Pass errors to the error handler middleware
//     }
//   }
// );

// Get Product by ID (Exclude deleted)
// export const getProductById = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const { id } = req.params;

//     try {
//       const product = await Product.findOne({
//         where: { id, deleted_at: null }, // Ensure the product is not soft-deleted
//       });

//       if (!product) {
//         res.status(404).json({
//           status: 'error',
//           message: 'Product not found or has been deleted',
//         });
//         return;
//       }

//       res.status(200).json({
//         status: 'success',
//         data: product,
//       });
//     } catch (error) {
//       next(error); // Pass errors to the error handler middleware
//     }
//   }
// );

// Update Product (Exclude deleted)
// export const updateProduct = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const { id } = req.params;
//     const { name, description, price, stock_quantity, category_id } = req.body;

//     try {
//       const product = await Product.findOne({
//         where: { id, deleted_at: null }, // Exclude soft-deleted products
//       });

//       if (!product) {
//         res.status(404).json({
//           status: 'error',
//           message: 'Product not found or has been deleted',
//         });
//         return;
//       }

//       product.name = name || product.name;
//       product.description = description || product.description;
//       product.price = price || product.price;
//       product.stock_quantity = stock_quantity || product.stock_quantity;
//       product.category_id = category_id || product.category_id;

//       await product.save();

//       res.status(200).json({
//         status: 'success',
//         message: 'Product updated successfully',
//         data: product,
//       });
//     } catch (error) {
//       next(error); // Pass errors to the error handler middleware
//     }
//   }
// );

// Soft Delete Product (Set deleted_at)
// export const deleteProduct = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const { id } = req.params;

//     try {
//       const product = await Product.findOne({
//         where: { id, deleted_at: null }, // Ensure the product exists and is not already deleted
//       });

//       if (!product) {
//         res.status(404).json({
//           status: 'error',
//           message: 'Product not found or has been deleted',
//         });
//         return;
//       }

//       product.deleted_at = new Date(); // Set deleted_at for soft delete
//       await product.save();

//       res.status(200).json({
//         status: 'success',
//         message: 'Product soft deleted successfully',
//         data: product,
//       });
//     } catch (error) {
//       next(error); // Pass errors to the error handler middleware
//     }
//   }
// );

//**************************************************************************** */

// Import necessary modules and models
import { APIGatewayProxyHandler } from 'aws-lambda';
import Product from '../models/Product';



// createProduct Lambda Function

// export const createProduct: APIGatewayProxyHandler = async (event) => {
//   try {
//     const { name, description, price, stock_quantity, category_id } = JSON.parse(event.body!);

//     const newProduct = await Product.create({
//       name,
//       description,
//       price,
//       stock_quantity,
//       category_id,
//     });

//     return {
//       statusCode: 201,
//       body: JSON.stringify({
//         status: 'success',
//         message: 'Product created successfully',
//         data: newProduct,
//       }),
//     };
//   } catch (error) {
//     // Validate error type
//     if (error instanceof Error) {
//       return {
//         statusCode: 500,
//         body: JSON.stringify({
//           status: 'error',
//           message: 'Failed to create product',
//           error: error.message, // Safe to access 'message' now
//         }),
//       };
//     }

//     // Handle unexpected error types
//     return {
//       statusCode: 500,
//       body: JSON.stringify({
//         status: 'error',
//         message: 'An unknown error occurred',
//         error: String(error), // Convert unknown error to a string
//       }),
//     };
//   }
// };

export const createProduct: APIGatewayProxyHandler = async (event) => {
  try {
    const { name, description, price, stock_quantity, category_id } = JSON.parse(event.body!);

    const newProduct = await Product.create({
      name,
      description,
      price,
      stock_quantity,
      category_id,
    });

    return {
      statusCode: 201,
      body: JSON.stringify({
        status: 'success',
        message: 'Product created successfully',
        data: newProduct,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: 'error',
        message: 'Failed to create product',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};


// getAllProducts Lambda Function

export const getAllProducts: APIGatewayProxyHandler = async () => {
  try {
    const products = await Product.findAll({
      where: { deleted_at: null },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 'success',
        data: products,
      }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: 'error',
        message: 'Failed to fetch products',
        error: error.message,
      }),
    };
  }
};

// getProductById Lambda Function

export const getProductById: APIGatewayProxyHandler = async (event) => {
  try {
    const { id } = event.pathParameters!;

    const product = await Product.findOne({
      where: { id, deleted_at: null },
    });

    if (!product) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          status: 'error',
          message: 'Product not found or has been deleted',
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 'success',
        data: product,
      }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: 'error',
        message: 'Failed to fetch product',
        error: error.message,
      }),
    };
  }
};


// updateProduct Lambda Function

export const updateProduct: APIGatewayProxyHandler = async (event) => {
  try {
    const { id } = event.pathParameters!;
    const { name, description, price, stock_quantity, category_id } = JSON.parse(event.body!);

    const product = await Product.findOne({
      where: { id, deleted_at: null },
    });

    if (!product) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          status: 'error',
          message: 'Product not found or has been deleted',
        }),
      };
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock_quantity = stock_quantity || product.stock_quantity;
    product.category_id = category_id || product.category_id;

    await product.save();

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 'success',
        message: 'Product updated successfully',
        data: product,
      }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: 'error',
        message: 'Failed to update product',
        error: error.message,
      }),
    };
  }
};


// deleteProduct Lambda Function

export const deleteProduct: APIGatewayProxyHandler = async (event) => {
  try {
    const { id } = event.pathParameters!;

    const product = await Product.findOne({
      where: { id, deleted_at: null },
    });

    if (!product) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          status: 'error',
          message: 'Product not found or has been deleted',
        }),
      };
    }

    product.deleted_at = new Date();
    await product.save();

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 'success',
        message: 'Product soft deleted successfully',
        data: product,
      }),
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          status: 'error',
          message: 'Failed to delete product',
          error: error.message, // Safely access message
        }),
      };
    }

    // Handle unexpected error types
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: 'error',
        message: 'An unknown error occurred',
        error: String(error), // Convert unknown error to a string
      }),
    };
  }
};


