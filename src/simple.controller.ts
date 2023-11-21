import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { OfficeService } from './office.service';
import { Office } from './Office';

@Controller()
export class SimpleController {

  @Get()
  helloWorld(): string {
    return "It works!";
  }
}
