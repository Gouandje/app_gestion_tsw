import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PayscaService } from './paysca.service';
import { CreatePayscaDto } from './dto/create-paysca.dto';
import { UpdatePayscaDto } from './dto/update-paysca.dto';
import { QueryDto } from 'src/weekendy/dto/requete.dto';
import { GetterCaPaysMoisAnneeDTO } from './dto/getterCaPaysMoisAnnee.dto';

@Controller('paysca')
export class PayscaController {
  constructor(private readonly payscaService: PayscaService) {}

  @Post('allCapays')
  findAll(@Body() query: QueryDto) {
    return this.payscaService.findAll(query);
  }

  @Post('createcamoisannepays')
  createca(@Body() query: CreatePayscaDto) {
    return this.payscaService.create(query);
  }

  @Patch('updatemoisannepays/:id')
  updatecaYear(@Param('id') id: string, @Body() query: CreatePayscaDto) {
    return this.payscaService.updateCaPaysMoisDirect(id, query);
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
  updateyear(@Param('id') id: string, @Body() updatePayscaDto: UpdatePayscaDto) {
    return this.payscaService.updateyear(id, updatePayscaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payscaService.remove(id);
  }

  @Delete('supprimer/:id')
  delete(@Param('id') id: string) {
    return this.payscaService.delete(id);
  }

  @Post('capaysmoisannee')
  findOneCaPaysMoisAnnee(@Body() getterCaPaysMoisAnneedto: GetterCaPaysMoisAnneeDTO){
    console.log(getterCaPaysMoisAnneedto);
    return this.payscaService.findOnePaysCamoisExist(getterCaPaysMoisAnneedto.countryId, getterCaPaysMoisAnneedto.mois, getterCaPaysMoisAnneedto.annee);

  }

  
}
