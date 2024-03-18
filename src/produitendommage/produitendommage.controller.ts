import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProduitendommageService } from './produitendommage.service';
import { UpdateProduitendommageDto } from './dto/update-produitendommage.dto';
import { CreateProduitendommageDto } from './dto/create-produitendommage.dto copy';
import { CreateVenteProduitendommageDto } from './dto/create-venteproduitendommage.dto';

@Controller('produitendommage')
export class ProduitendommageController {
  constructor(private readonly produitendommageService: ProduitendommageService) {}
 
  @Post('saveendoproduit')
  create(@Body() createProduitendommageDto: CreateProduitendommageDto) {
    return this.produitendommageService.create(createProduitendommageDto);
  }

  
  @Post('venteEndoproduit')
  venteEndoproduit(@Body() createventeProduitendommageDto: CreateVenteProduitendommageDto) {
    return this.produitendommageService.createvente(createventeProduitendommageDto);
  }

  @Get('allendoproduit')
  findAll() {
    return this.produitendommageService.findAll();
  }

  @Get('allendobyproduit/:id')
  findAllByProduct(@Param('id') id: string) {
    return this.produitendommageService.findAllDetailByProduct(id);
  }

  @Get('allventeendoproduit')
  findAllVente() {
    return this.produitendommageService.findAllVente();
  }

  @Get('singleendoproduit/:id')
  findOne(@Param('id') id: string) {
    return this.produitendommageService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProduitendommageDto: UpdateProduitendommageDto) {
    return this.produitendommageService.update(id, updateProduitendommageDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.produitendommageService.remove(id);
  }
}
