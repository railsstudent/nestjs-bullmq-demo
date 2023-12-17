import dotenv from 'dotenv';

dotenv.config();

export const env = {
  REDIS: {
    HOST: process.env.REDIS_HOST || 'localhost',
    PORT: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },
};
