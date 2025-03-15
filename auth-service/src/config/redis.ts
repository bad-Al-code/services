import Redis from 'ioredis';
import { env } from './env';

export const redisClient = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});
