import { createNotification } from '../services/notification.service.js';

const createNotificationController = async (req, res, next) => {
    try {
        const project = req.project; // Assume project is attached to req
        const body = req.body;
        const notification = await createNotification(project, body);

        // create db record if valid notification
        return res.status(201).json(notification); 
    } catch (error) {
        next(error);
    }
};

export { createNotificationController };