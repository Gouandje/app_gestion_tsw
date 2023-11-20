import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PayscaService } from './paysca.service';
import { CreatePayscaDto } from './dto/create-paysca.dto';
import { UpdatePayscaDto } from './dto/update-paysca.dto';
import { QueryDto } from 'src/weekendy/dto/requete.dto';

@Controller('paysca')
export class PayscaController {
  constructor(private readonly payscaService: PayscaService) {}

  @Post('allCapays')
  findAll(@Body() query: QueryDto) {
    return this.payscaService.findAll(query);
  }


  @Get('allCapaysmois/:id')
  findAllMois(@Param('id') id: string) {
    return this.payscaService.findPaysCamois(id);
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
