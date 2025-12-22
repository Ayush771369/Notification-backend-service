import { Router } from 'express';
import { createNotificationController } from '../controllers/notification.controller.js';
import apiKeyMiddleware from '../middlewares/apiKey.middleware.js';
import rateLimiterMiddleware from '../middlewares/rateLimit.middleware.js';
import { prisma } from '../config/prisma.client.js';

const router = Router();

router.post('/notifications', apiKeyMiddleware, rateLimiterMiddleware, createNotificationController);
export default router;