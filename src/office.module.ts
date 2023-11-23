import { Module } from '@nestjs/common';
import { OfficeController } from './office.controller';
import { OfficeService } from './office.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule],
  controllers: [OfficeController],
  providers: [OfficeService],
})
export class OfficeModule {}
