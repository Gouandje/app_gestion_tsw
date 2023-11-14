import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';

@Controller('zone')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  @Post('newzone')
  create(@Body() createZoneDto: CreateZoneDto) {
    return this.zoneService.create(createZoneDto);
  }

  @Get('allzone')
  findAll() {
    return this.zoneService.findAll();
  }

  @Get('singlezone/:id')
  findOne(@Param('id') id: string) {
    return this.zoneService.findOne(id);
  }

  @Get('getZonebyCountry/:id')
  findByCountry(@Param('id') id: string) {
    return this.zoneService.findpays(id);
  }

  @Patch('updatezone/:id')
  update(@Param('id') id: string, @Body() updateZoneDto: UpdateZoneDto) {
    return this.zoneService.update(id, updateZoneDto);
  }

  @Delete('deletezone/:id')
  remove(@Param('id') id: string) {
    return this.zoneService.remove(id);
  }
}
