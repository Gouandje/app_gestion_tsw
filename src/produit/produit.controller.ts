import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';

import { ProduitService } from './produit.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';

@Controller('produit')
export class ProduitController {
  constructor(
    private readonly produitService: ProduitService,
    
    ) {}

  @Post('newproduit')
  create(@Body() createProduitDto: CreateProduitDto){
    return this.produitService.create(createProduitDto);
  }

  // @Get('ajoutproduit')
  // createDierect(){
  //   return this.produitService.createDirec();
  // }

  @Get('allproduit')
  findAll() {
    return this.produitService.findAll();
  }

  @Get('singleproduit/:id')
  findOne(@Param('id') id: string) {
    return this.produitService.findOne(id);
  }

  @Patch('updateproduit/:id')
  update(@Param('id') id: string, @Body() updateProduitDto: UpdateProduitDto) {
    return this.produitService.update(id, updateProduitDto);
  }

  @Delete('deleteproduit/:id')
  remove(@Param('id') id: string) {
    return this.produitService.remove(id);
  }

}
