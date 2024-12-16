// src/models/product.model.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database'; // Import the sequelize instance from dbConnection
import { productValidationSchema } from '../validations/productValidation'; // Import the validation schema
class Product extends Model {
    // Method to validate product data before saving
    static validateProduct(data) {
        return productValidationSchema.validate(data);
    }
}
Product.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    stock_quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    },
}, {
    sequelize, // Pass the Sequelize instance
    tableName: 'products',
    modelName: 'Product',
    timestamps: false, // We handle created_at, updated_at, and deleted_at manually
});
export default Product;
