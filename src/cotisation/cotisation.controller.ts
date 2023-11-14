import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CotisationService } from './cotisation.service';
import { CreateCotisationDto } from './dto/create-cotisation.dto';
import { UpdateCotisationDto } from './dto/update-cotisation.dto';

@Controller('cotisation')
export class CotisationController {
  
  constructor(private readonly cotisationService: CotisationService) {}

  @Post()
  create(@Body() createCotisationDto: CreateCotisationDto) {
    return this.cotisationService.create(createCotisationDto);
  }

  @Get('allcotisation/:id')
  findAll() {
    return this.cotisationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cotisationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCotisationDto: UpdateCotisationDto) {
    return this.cotisationService.update(+id, updateCotisationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cotisationService.remove(+id);
  }
}
