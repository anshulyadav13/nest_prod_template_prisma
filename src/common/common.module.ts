import { Module } from '@nestjs/common';
import { RawQueryService } from './utils/helpers';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [RawQueryService],
  exports: [RawQueryService],
})
export class CommonModule {} 