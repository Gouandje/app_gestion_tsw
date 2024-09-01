import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommisairecontrolService } from './commisairecontrol.service';
import { CreateCommisairecontrolDto } from './dto/create-commisairecontrol.dto';
import { UpdateCommisairecontrolDto } from './dto/update-commisairecontrol.dto';

@Controller('commisairecontrol')
export class CommisairecontrolController {
  constructor(private readonly commisairecontrolService: CommisairecontrolService) {}

  @Post('newcommissaire')
  create(@Body() createCommisairecontrolDto: CreateCommisairecontrolDto) {
    return this.commisairecontrolService.create(createCommisairecontrolDto);
  }

  @Get('allcommissaires')
  findAll() {
    return this.commisairecontrolService.findAll();
  }

  @Get('singlecommissaire/:id')
  findOne(@Param('id') id: string) {
    return this.commisairecontrolService.findOne(id);
  }

  @Patch('updatecommissaire/:id')
  update(@Param('id') id: string, @Body() updateCommisairecontrolDto: UpdateCommisairecontrolDto) {
    return this.commisairecontrolService.update(id, updateCommisairecontrolDto);
  }

  @Delete('deletecommissaire/:id')
  remove(@Param('id') id: string) {
    return this.commisairecontrolService.remove(id);
  }
}
