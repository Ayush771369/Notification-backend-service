import { Router } from 'express';
import { generateApiKey } from '../controllers/apiKey.controller.js';

const router = Router();
router.post('/projects/:projectId/apikeys', generateApiKey);

export default router;
