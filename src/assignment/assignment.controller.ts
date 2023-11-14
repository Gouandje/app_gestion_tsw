import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';

import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Controller('mission')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Post('newMission')
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentService.create(createAssignmentDto);
  }

  @Get('allMissions')
  findAll() {
    return this.assignmentService.findAll();
  }

  @Get('singleMission/:id')
  findOne(@Param('id') id: MongooseSchema.Types.ObjectId) {
    return this.assignmentService.findOne(id);
  }

  @Patch('updateMission/:id')
  update(@Param('id') id: MongooseSchema.Types.ObjectId, @Body() updateAssignmentDto: UpdateAssignmentDto) {
    return this.assignmentService.update(id, updateAssignmentDto);
  }

  @Delete('deleteMission/:id')
  remove(@Param('id') id: string) {
    return this.assignmentService.remove(id);
  }
}
