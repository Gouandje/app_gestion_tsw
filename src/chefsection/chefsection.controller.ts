import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChefsectionService } from './chefsection.service';
import { CreateChefsectionDto } from './dto/create-chefsection.dto';
import { UpdateChefsectionDto } from './dto/update-chefsection.dto';

@Controller('chefsection')
export class ChefsectionController {
  constructor(private readonly chefsectionService: ChefsectionService) {}

  @Post('addcheftosection')
  create(@Body() createChefsectionDto: CreateChefsectionDto) {
    return this.chefsectionService.create(createChefsectionDto);
  }

  @Get('getallchefsection')
  findAll() {
    return this.chefsectionService.findAll();
  }

  @Get('getchefbysection/:id')
  findOne(@Param('id') id: string) {
    return this.chefsectionService.findOne(id);
  }

  @Get('getsinglechefsection/:id')
  findBySection(@Param('id') id: string) {
    return this.chefsectionService.findBySection(id);
  }

  @Patch('updatechefsection/:id')
  update(@Param('id') id: string, @Body() updateChefsectionDto: UpdateChefsectionDto) {
    return this.chefsectionService.update(id, updateChefsectionDto);
  }

  @Delete('deletechefsection/:id')
  remove(@Param('id') id: string) {
    return this.chefsectionService.remove(id);
  }
}
