import { Module } from '@nestjs/common';
import { RawQueryService, SensitiveDataSanitizer } from './utils/helpers';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [RawQueryService, SensitiveDataSanitizer],
  exports: [RawQueryService, SensitiveDataSanitizer],
})
export class CommonModule {} 