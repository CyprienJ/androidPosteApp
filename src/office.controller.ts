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

@Controller('offices')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @Get()
  findOffice(@Query('caracteristique') caracteristique: string): Array<Office> {
    if (caracteristique) {
      return this.officeService.getOfficesOfCaracteristique(caracteristique);
    }
    return this.officeService.getAllOffices();
  }

  @Post()
  createBook(@Body() office: Office): Office {
    this.officeService.addOffice(office);
    return this.officeService.getOffice(office.libele);
  }

  @Get(':libele')
  getBook(@Param('libele') libele: string): Office {
    return this.officeService.getOffice(libele);
  }

  @Delete(':libele')
  deleteBook(@Param('libele') libele: string): void {
    this.officeService.delete(libele);
  }
}
