import { Module } from '@nestjs/common';
import { DummyService } from './dummy.service';
import { DummyController } from './dummy.controller';
import { LoggerService } from '../../common/logger/logger.service';
import { ConfigService } from '../../config/config.service';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [CommonModule],
  providers: [DummyService, LoggerService, ConfigService],
  controllers: [DummyController],
})
export class DummyModule {} 