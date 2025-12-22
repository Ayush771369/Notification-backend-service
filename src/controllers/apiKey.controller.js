// controller logic for managing API keys
import { createApiKey } from '../services/apikey.service.js';

const generateApiKey = async (req, res, next) => {
    try {
        const {projectId} = req.params; // Assuming projectId is passed as a URL parameter
        if (!projectId) {
            return res.status(400).json({ message: 'Project ID is required' });
        }
        const newApiKey = await createApiKey(projectId);
        res.status(201).json({ message: 'API key generated successfully, You will not see it again', apiKey: newApiKey });

        next();
    } catch (error) {
        next(error);
    }
};

export { generateApiKey };