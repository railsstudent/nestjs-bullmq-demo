import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { bullboardConfig } from './config/bull-board.config';
import { queueConfig } from './config/queue.config';
import { MathModule } from './math/math.module';

@Module({
  imports: [queueConfig, bullboardConfig, MathModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
