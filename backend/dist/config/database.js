// dbConnection.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();
// Create a new Sequelize instance
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: false, // Disable Sequelize logging
});
// Test the connection
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate(); // Use Sequelize's authenticate method
        console.log('Connected to PostgreSQL database!');
    }
    catch (error) {
        console.error('Error connecting to the database:', error);
    }
});
export { connectToDB, sequelize };
// ----------------------------------------------
// import pkg from 'pg';
// const { Pool } = pkg;
// import dotenv from 'dotenv';
// dotenv.config();
// const pool = new Pool({
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT || '5432', 10),
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
// });
// const connectToDB = async () => {
//   try {
//     const client = await pool.connect();
//     console.log('Connected to PostgreSQL database!');
//     client.release();
//   } catch (error) {
//     console.error('Error connecting to the database:', error);
//   }
// };
// export default connectToDB;
