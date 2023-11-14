import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post('newsection')
  create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.create(createSectionDto);
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
