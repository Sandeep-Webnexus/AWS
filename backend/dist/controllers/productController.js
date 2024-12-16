// import { Request, Response, NextFunction } from 'express';
//import Product from '../models/Product'; // Assuming the Product model is in the models folder
//import asyncHandler from '../middleware/asyncHandler'; // Ensure this is installed
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
export const createProduct = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, stock_quantity, category_id } = JSON.parse(event.body);
        const newProduct = yield Product.create({
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
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                status: 'error',
                message: 'Failed to create product',
                error: error instanceof Error ? error.message : 'Unknown error',
            }),
        };
    }
});
// getAllProducts Lambda Function
export const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product.findAll({
            where: { deleted_at: null },
        });
        return {
            statusCode: 200,
            body: JSON.stringify({
                status: 'success',
                data: products,
            }),
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                status: 'error',
                message: 'Failed to fetch products',
                error: error.message,
            }),
        };
    }
});
// getProductById Lambda Function
export const getProductById = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = event.pathParameters;
        const product = yield Product.findOne({
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
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                status: 'error',
                message: 'Failed to fetch product',
                error: error.message,
            }),
        };
    }
});
// updateProduct Lambda Function
export const updateProduct = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = event.pathParameters;
        const { name, description, price, stock_quantity, category_id } = JSON.parse(event.body);
        const product = yield Product.findOne({
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
        yield product.save();
        return {
            statusCode: 200,
            body: JSON.stringify({
                status: 'success',
                message: 'Product updated successfully',
                data: product,
            }),
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                status: 'error',
                message: 'Failed to update product',
                error: error.message,
            }),
        };
    }
});
// deleteProduct Lambda Function
export const deleteProduct = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = event.pathParameters;
        const product = yield Product.findOne({
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
        yield product.save();
        return {
            statusCode: 200,
            body: JSON.stringify({
                status: 'success',
                message: 'Product soft deleted successfully',
                data: product,
            }),
        };
    }
    catch (error) {
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
});
