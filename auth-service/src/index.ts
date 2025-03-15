import { redisClient } from './config/redis';
import { db } from './drizzle/db';

async function startServer() {
  await db;
  await redisClient;
}
