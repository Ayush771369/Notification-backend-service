
import { prisma } from '../config/prisma.client.js';

const apiKeyMiddleware = async (req, res, next) => {
    try {
        //read apikey from headers
        const apiKey = req.headers['x-api-key']; // Assuming the API key is sent in the 'x-api-key' header
        if (!apiKey) {
            return res.status(401).json({message: 'API key missing'});
        }
        const apiKeyRecord = await prisma.aPIKey.findUnique({ // Adjusted to match Prisma syntax
        where: {
            key: apiKey, // Assuming 'key' is the field name in the database
        },
        include: {
            project: true
        }
    });
        if (!apiKeyRecord) { 
            return res.status(403).json({message: 'Invalid API key'});
        }
        if(apiKeyRecord.status !== 'ACTIVE') {
            return res.status(403).json({message: 'API key revoked'});
        }

        if(apiKeyRecord.project.status != 'ACTIVE') {
            return res.status(403).json({message: 'Project is not active'});
        }
        if(!apiKeyRecord.project) {
            return res.status(403).json({message: 'Associated project not found'});
        }
        req.project = apiKeyRecord.project; // Attach project info to request object
        req.apiKey = apiKeyRecord; // Attach apiKey info to request object
        next();

    } catch (error) {
        next(error);
    }
};

export default apiKeyMiddleware;