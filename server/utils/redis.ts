import { Redis } from 'ioredis';
import dotenv from 'dotenv';

dotenv.config()
const Redis_Url = process.env.REDIS_URL;

const redisClient = () => {
  if (Redis_Url) {
    console.log('🎉 Redis conneted successfully');
    return Redis_Url;
  } throw new Error('😒 cannot connect to Redis')
}

export const redis = new Redis(redisClient());