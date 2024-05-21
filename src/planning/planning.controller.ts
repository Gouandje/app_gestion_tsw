import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanningService } from './planning.service';
import { CreatePlanningDto } from './dto/create-planning.dto';
import { UpdatePlanningDto } from './dto/update-planning.dto';
import { UpdateEventStatusDtoo } from './dto/updateEventStatus.dto';

@Controller('planning')
export class PlanningController {
  constructor(private readonly planningService: PlanningService) {}

  @Post('createEvent')
  create(@Body() createPlanningDto: CreatePlanningDto) {
    return this.planningService.create(createPlanningDto);
  }

  @Get('allEvent')
  findAll() {
    return this.planningService.findAll();
  }

  @Get('singleEvent/:id')
  findOne(@Param('id') id: string) {
    return this.planningService.findOne(id);
  }

  @Patch('updateEvent/:id')
  update(@Param('id') id: string, @Body() updatePlanningDto: UpdatePlanningDto) {
    return this.planningService.update(id, updatePlanningDto);
  }

  @Delete('deleteEvent/:id')
  remove(@Param('id') id: string) {
    return this.planningService.remove(id);
  }

  @Patch('updatestatus/:id')
  updatestatus(@Param('id') id: string, @Body() status: UpdateEventStatusDtoo){
    return this.planningService.updatestatus(id, status);
  }
}
