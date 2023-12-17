import { BullModule } from '@nestjs/bullmq';

import { env } from './env.config';

export const queueConfig = BullModule.forRoot({
  connection: {
    host: env.REDIS.HOST,
    port: env.REDIS.PORT,
  },
  defaultJobOptions: {
    removeOnComplete: 1000,
    removeOnFail: 5000,
    attempts: 3,
  },
});
