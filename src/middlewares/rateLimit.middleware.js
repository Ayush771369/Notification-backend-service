import { redisClient } from '../config/redis.js';

// Middleware to limit repeated requests to public APIs and/or endpoints
const rateLimiterMiddleware = async (req, res, next) => {
    try {
        if(!req.project) {
            return next();
        }
        const projectId = req.project.id;
        const perMinuteLimit = req.project.rateLimit; // in seconds
        const dailyLimit = req.project.dailyQuota // number of requests allowed per day
        // Create unique keys for rate limiting
        const minuteKey = `rate_limit:${projectId}:minute`;
        const dailyKey = `rate_limit:${projectId}:daily`;

        // Increment the request count for the minute
        const currentMinuteCount = await redisClient.incr(minuteKey);
        if (currentMinuteCount === 1) {
            await redisClient.expire(minuteKey,60);
        }
        //increment daily count
        const currentDailyCount = await redisClient.incr(dailyKey);
        if (currentDailyCount === 1) {
            await redisClient.expire(dailyKey,86400); // 24 hours
        }
        // Check if the request count exceeds the per minute limit
        if (currentMinuteCount > perMinuteLimit) {
            return res.status(429).json({ message: 'Too many requests - try again later' });
        }
        // Check if the request count exceeds the daily limit
        if (currentDailyCount > dailyLimit) {
            return res.status(429).json({ message: 'Daily request limit exceeded - try again tomorrow' });
        }

        next();
        
    } catch (error) {
        next(error);
    }
}

export default rateLimiterMiddleware;