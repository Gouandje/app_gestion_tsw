import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DelecountryService } from './delecountry.service';

@Controller('delecountry')
export class DelecountryController {
  constructor(private readonly delecountryService: DelecountryService) {}

  @Delete('deletepays/:id')
  remove(@Param('id') id: string) {
    return this.delecountryService.remove(id);
  }

  @Delete('deletezone/:id')
  removezone(@Param('id') id: string) {
    return this.delecountryService.removezone(id);
  }

  @Delete('deletesection/:id')
  removesection(@Param('id') id: string) {
    return this.delecountryService.removesection(id);
  }

  @Delete('deleteagence/:id')
  removebureau(@Param('id') id: string) {
    return this.delecountryService.removebureau(id);
  }
}
