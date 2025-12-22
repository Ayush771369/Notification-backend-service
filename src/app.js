import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import apiKeyRoutes from './routes/apiKey.routes.js';
import notificationRoutes from './routes/notification.route.js';

import {errorHandler} from './middlewares/error.middleware.js';
import routes from './routes/index.js';
dotenv.config();

const app = express();

// Middleware
app.use(helmet()); // Security headers 
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON request bodies

app.use('/api', routes); // API routes

app.use('/api', apiKeyRoutes); // API Key routes
app.use('/api', notificationRoutes); // Notification routes

// Error handling middleware
app.use(errorHandler);

export default app;