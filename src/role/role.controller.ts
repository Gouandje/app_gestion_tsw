import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('createRole')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get('allRole')
  findAll() {
    return this.roleService.findAll();
  }

  @Get('singleRole/:id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Patch('updateRole/:id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete('deleteRole/:id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
