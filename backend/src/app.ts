// src/app.ts
// import express from 'express';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { errorHandler } from 'middleware/errorHandler';
import router from 'routes/productRoute';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json' assert { type: 'json' };
 // Adjust the path as needed



dotenv.config();  // Load environment variables from .env
const app = express();


// ==============Middleware================================
app.use(express.json()); // For parsing application/json
app.use(cors()); // Allow all origins (you can configure it further)
app.use(helmet()); // Enable Helmet for security headers
app.use(morgan('combined')); // Logs all HTTP requests with the "combined" format
app.use(morgan('dev')); // Use morgan for logging
app.use(bodyParser.json()); // For JSON data
app.use(bodyParser.urlencoded({ extended: true })); // For URL-encoded data


// ========Error handling middleware
app.use(errorHandler);


// ============= Use the routes====================
// app.use('/api/products',router );


// ============== Swagger documentation ===================
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// ------Middleware and routes can be added here----
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

export default app;
