//code to generate and manage API keys
import crypto from 'crypto';
import { prisma } from '../config/prisma.client.js';

// Function to generate a new API key
const createApiKey = async (projectid) => {
    const apiKey = crypto.randomBytes(32).toString('hex'); // Generate a random 64-character hex string
    //prepend a prefix to identify the key type
    const prefixedApiKey = `sk_live_${apiKey}`;

    console.log(Object.keys(prisma));


    await prisma.aPIKey.create({
        data: {
            key: prefixedApiKey,
            projectId: projectid,
        },
    });
    return prefixedApiKey;
};

export { createApiKey };