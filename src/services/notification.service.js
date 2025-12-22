import { prisma } from '../config/prisma.client.js';


const createNotification = async (project, data) => {
    const {type, payload} = data;
    if (!type || !payload) {
        throw new Error('Invalid notification data');
    }

    if (type === 'EMAIL') {
        if(!payload.to || !payload.subject || !payload.body) {
            throw new Error('Invalid email notification payload');
        }
    }
    if (type === 'SMS') {
        if(!payload.to || !payload.message) {
            throw new Error('Invalid SMS notification payload');
        }
    }
    if (type === 'PUSH') {
        if(!payload.deviceId || !payload.message) {
            throw new Error('Invalid push notification payload');
        }
    }

    if(type === "WEBHOOK") {
        if(!payload.url || !payload.event || !payload.data) {
            throw new Error('Invalid webhook notification payload');
        }
    }

    const notification = await prisma.notification.create({
        data: {
            projectId: project.Id,
            type,
            payload,
            status: 'PENDING',
        },
    })

    return {
        id: notification.id,
        type: notification.type,
        status: notification.status,
        createdAt: notification.createdAt,
        updatedAt: notification.updatedAt,
    }
}

export {
    createNotification,
}