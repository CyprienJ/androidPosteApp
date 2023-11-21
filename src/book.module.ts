import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { OfficeService } from './office.service';
import { HttpModule } from '@nestjs/axios';
import {SimpleController} from "./simple.controller";

@Module({
  imports: [HttpModule],
  controllers: [BookController, SimpleController],
  providers: [OfficeService],
})
export class BookModule {}
