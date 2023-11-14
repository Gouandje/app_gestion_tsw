import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post('newmanager')
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managerService.create(createManagerDto);
  }

  @Get('allmanager')
  findAll() {
    return this.managerService.findAll();
  }

  @Get('allmanagerSupervisor')
  findAllSupervisor() {
    return this.managerService.findAllSupervisor();
  }

  @Get('allmanagers')
  findAllManager() {
    return this.managerService.findAllManager();
  }

  @Get('allmanagersnonaffectes')
  findAllManagers() {
    return this.managerService.findAllManagersNonAffectes();
  }


  @Get('singlemanager/:id')
  findOne(@Param('id') id: string) {
    return this.managerService.findOne(id);
  }

  @Patch('updatemanager/:id')
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managerService.update(id, updateManagerDto);
  }

  @Patch('updatemanagerstatus/:id')
  updatestatus(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.managerService.updateStatut(id, updateStatusDto);
  }

  @Delete('deletemanager/:id')
  remove(@Param('id') id: string) {
    return this.managerService.remove(id);
  }
  
}
