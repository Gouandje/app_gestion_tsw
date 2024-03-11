import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { RecherchecaDto } from './dto/rechercheca.dto';

@Controller('section')
export class SectionController {
  
  constructor(private readonly sectionService: SectionService) {}

  @Post('newsection')
  create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.create(createSectionDto);
  }

  @Post('filtersectioncaannee')
  recherchecaSection(@Body() recherchecaDto: RecherchecaDto) {
    return this.sectionService.findAllsectioncamois(recherchecaDto.param1, recherchecaDto.param2);
  }

  @Get('allsectionca/:id')
  findAllsectionca(@Param('id') id: string) {
    return this.sectionService.findAllsectionca(id);
  }

  @Get('allsection')
  findAll() {
    return this.sectionService.findAll();
  }

  @Get('allsectionzone/:id')
  findAllByZone(@Param('id') id: string) {
    return this.sectionService.findAllByZone(id);
  }

  @Get('singlesection/:id')
  findOne(@Param('id') id: string) {
    return this.sectionService.findOne(id);
  }

  @Patch('updatesection/:id')
  update(@Param('id') id: string, @Body() updateSectionDto: UpdateSectionDto) {
    return this.sectionService.update(id, updateSectionDto);
  }

  @Delete('deletesection/:id')
  remove(@Param('id') id: string) {
    return this.sectionService.remove(id);
  }
}
