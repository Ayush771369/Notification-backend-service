import 'dotenv/config';
import { NotificationStatus } from '@prisma/client';
import { prisma } from '../config/prisma.client.js';
import { sendNotification } from '../services/notificationSender.service.js';

const BATCH_SIZE = 10;
const MAX_ATTEMPTS = 3;
const POLL_INTERVAL_MS = 2000;
console.log("Worker database url: ", process.env.DATABASE_URL);
const fetchPendingNotifications = async () => {
  const notifications = await prisma.notification.findMany({
    where: {
      status: NotificationStatus.PENDING,
      attempts: { lt: MAX_ATTEMPTS },
    },
    take: BATCH_SIZE,
    orderBy: { createdAt: 'asc' },
  });

  const lockedNotifications = [];

  for (const notification of notifications) {
    const locked = await prisma.notification.updateMany({
      where: {
        id: notification.id,
        status: NotificationStatus.PENDING,
      },
      data: {
        status: NotificationStatus.PROCESSING,
      },
    });
    console.log(`Found notifications: ${locked.count} `)

    if (locked.count === 1) {
      lockedNotifications.push(notification);
    }
  }

  return lockedNotifications;
};

const processNotification = async (notification) => {
  try {
    await sendNotification(notification);

    await prisma.notification.update({
      where: { id: notification.id },
      data: {
        status: NotificationStatus.SENT,
      },
    });

    console.log(` Processed notification ${notification.id}`);
  } catch (error) {
    const nextAttempt = notification.attempts + 1;

    await prisma.notification.update({
      where: { id: notification.id },
      data: {
        attempts: nextAttempt,
        lastError: error.message,
        status: nextAttempt >= MAX_ATTEMPTS ? NotificationStatus.FAILED : NotificationStatus.PENDING,
      },
    });

    console.error(
      ` Failed notification ${notification.id} (attempt ${nextAttempt}): ${error.message}`
    );
  }
};

const startWorker = async () => {
  console.log('Notification worker started');

  while (true) {
    try {
      const pendingNotifications = await fetchPendingNotifications();

      for (const notification of pendingNotifications) {
        await processNotification(notification);
      }
    } catch (error) {
      console.error('Worker error:', error);
    }

    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
  }
};

startWorker();
