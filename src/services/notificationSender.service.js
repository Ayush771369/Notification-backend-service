// accept a full notification object and send it via email
import { sendEmail } from '../providers/email.provider.js';
import { sendSMS } from '../providers/sms.provider.js';
import { sendPush } from '../providers/push.provider.js';
import { sendWebhook } from '../providers/webhook.provider.js';


const sendNotification = async (notification) => {
    const {type, payload } = notification;
    switch(type) {
        case 'EMAIL':
            await sendEmail(payload);
            return;
        case 'SMS':
            await sendSMS(payload);
            return;
        case 'PUSH':
            await sendPush(payload);
            return;
        case 'WEBHOOK':
            await sendWebhook(payload);
            return;
        default:
            throw new Error(`Unsupported notification type: ${type}`);
    }
}

export {
    sendNotification,
}