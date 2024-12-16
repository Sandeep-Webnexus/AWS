var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const createProduct = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const data = JSON.parse(event.body || "{}");
    return {
        statusCode: 201,
        body: JSON.stringify({ message: "Product created", data }),
    };
});
export const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "List of products", products: [] }),
    };
});
export const getProductById = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = event.pathParameters || {};
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Product details", id }),
    };
});
export const updateProduct = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = event.pathParameters || {};
    const data = JSON.parse(event.body || "{}");
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Product updated", id, data }),
    };
});
export const deleteProduct = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = event.pathParameters || {};
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Product deleted", id }),
    };
});
