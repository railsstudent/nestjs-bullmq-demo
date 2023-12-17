import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';

export const bullboardConfig = BullBoardModule.forRoot({
  route: '/queues',
  adapter: ExpressAdapter,
});
