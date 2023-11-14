import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MouvementstockService } from './mouvementstock.service';
import { CreateMouvementstockDto } from './dto/create-mouvementstock.dto';
import { UpdateMouvementstockDto } from './dto/update-mouvementstock.dto';

@Controller('mouvementstock')
export class MouvementstockController {
  constructor(private readonly mouvementstockService: MouvementstockService) {}

  @Post('newmvtstock')
  create(@Body() createMouvementstockDto: CreateMouvementstockDto) {
    return this.mouvementstockService.create(createMouvementstockDto);
  }

  @Get('allmvtstock')
  findAll() {
    return this.mouvementstockService.findAll();
  }

  @Get('singlemvtstock/:id')
  findOne(@Param('id') id: string) {
    return this.mouvementstockService.findOne(id);
  }

  @Patch('updatemvtstock/:id')
  update(@Param('id') id: string, @Body() updateMouvementstockDto: UpdateMouvementstockDto) {
    return this.mouvementstockService.update(+id, updateMouvementstockDto);
  }

  @Delete('deletemvtstock/:id')
  remove(@Param('id') id: string) {
    return this.mouvementstockService.remove(+id);
  }
}
