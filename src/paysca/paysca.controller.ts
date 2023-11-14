import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PayscaService } from './paysca.service';
import { CreatePayscaDto } from './dto/create-paysca.dto';
import { UpdatePayscaDto } from './dto/update-paysca.dto';

@Controller('paysca')
export class PayscaController {
  constructor(private readonly payscaService: PayscaService) {}

  @Get('allCapays/:year')
  findAll(@Param('year') year: string) {
    return this.payscaService.findAll(year);
  }


  @Get('allCapaysmois')
  findAllMois() {
    return this.payscaService.findPaysCamois();
  }

  @Get('allCaYears')
  findAllCaYear() {
    return this.payscaService.findAllCaYear();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payscaService.findOne(id);
  }

  @Get('allCaByPays/:id')
  findAllByCountry(@Param('id') id: string) {
    return this.payscaService.findAllByCountry(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayscaDto: UpdatePayscaDto) {
    return this.payscaService.update(id, updatePayscaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payscaService.remove(id);
  }
}
