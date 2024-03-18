import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaysService } from './pays.service';
import { CreatePaysDto } from './dto/create-pays.dto';
import { UpdatePaysDto } from './dto/update-pays.dto';

@Controller('pays')
export class PaysController {
  constructor(private readonly paysService: PaysService) {}

  @Post('newpays')
  create(@Body() createPaysDto: CreatePaysDto) {
    return this.paysService.create(createPaysDto);
  }

  @Get('allpays')
  findAll() {
    return this.paysService.findAll();
  }

  @Get('allpaysciv')
  findAllCIV() {
    return this.paysService.findAllCIV();
  }

  @Get('singlepays/:id')
  findOne(@Param('id') id: string) {
    return this.paysService.findOne(id);
  }

  @Patch('updatepays/:id')
  update(@Param('id') id: string, @Body() updatePaysDto: UpdatePaysDto) {
    return this.paysService.update(id, updatePaysDto);
  }
}
