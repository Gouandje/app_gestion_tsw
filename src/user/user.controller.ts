import { Controller, Get, Post, Body, Patch,Req, UseGuards, HttpCode, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, BadRequestException, Res, HttpStatus, HttpException } from '@nestjs/common';
import {Request} from 'express';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './schemas/user.schema';
import { FindOneParams } from './dto/find-one-params.dto';
import { DeleteUserResponse } from './dto/delete-response.dto';
import path = require('path');
import { join } from 'path';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable, of } from 'rxjs';
import { UserUpdate } from './dto/user-update.dto';
import { CommonResult } from 'src/auth/dto/common-result';

export const storage = {
  storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
          const name: string = file.originalname.split(".")[0];
          const fileExtension: string = file.originalname.split(".")[1];
          const newFileName: string = name.split("").join("_") +"_" + Date.now() + "." + fileExtension;
          cb(null, newFileName);
      }
  }),
  fileFilter: (req, file, cb) =>{
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
      return cb(null, false);
    }
    cb(null, true);
  }

}
// @UseInterceptors(ClassSerializerInterceptor)
@ApiTags('admins')
@Controller('admins')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('newAdmin')
  create(@Body() createUserDto: CreateUserDto) {

    // if(!file){
    //   throw new BadRequestException('le format du fichier choisi n\'est pas acceptable');

    // }else{
    //   const avatar = `http://localhost:3000/api/v1/admins/avatar/${file.filename}`;
      // createUserDto.avatar = file.filename;
      // console.log(createUserDto);
      return this.userService.create(createUserDto);

    // }

  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ description: 'Get all users' })
  @ApiOkResponse({
    description: 'The users were successfully obtained.',
    type: [User],
  })
  findAll() {
    return this.userService.findAll();
  }  

  @Get('singleuser/:adminId')
  @ApiOperation({
    description: 'Get a user by adminId.',
  })
  @ApiOkResponse({
    description: 'The user was successfully obtained.',
    type: User,
  })
  async getById(@Param() { adminId }: FindOneParams): Promise<User> {
    return this.userService.findById(adminId);
  }

  @Patch('update/:adminId')
  @ApiOperation({
    description: 'Update a user by adminId.',
  })
  @ApiOkResponse({
    description: 'The user was successfully updated.',
    type: User,
  })
  async update(
    @Param() { adminId }: FindOneParams,
    @Body() updateUserDto: UserUpdate,
  ){
    return this.userService.updateById(adminId, updateUserDto);
  }

  @Patch('updatepassword/:adminId')
  updatepassword(
    @Param('adminId') adminId: string,
    @Body() updateUserDto: any,
  ){
    return this.userService.updatePassword(adminId, updateUserDto);
  }


  @Delete('delete/:adminId')
  @ApiOperation({
    description: 'Delete a user by adminId.',
  })
  @ApiOkResponse({
    description: 'The user was successfully deleted.',
    type: DeleteUserResponse,
  })
  async deleteById(@Param() { adminId }: FindOneParams): Promise<DeleteUserResponse> {
    return this.userService.remove(adminId);
  }
  

  @Post('upload/:adminId')
  @UseInterceptors(FileInterceptor('avatar', storage))
  async uploadAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param() params,
    @Req() req: Request
  ) {
    if(!file){
      throw new BadRequestException('le format du fichier choisi n\'est pas acceptable')
    }
    console.log(`${req.protocol}://${req.get('Host')}${req.originalUrl}`);

    const avatar = ` https://appgestiontsw-production.up.railway.app/api/v1/admins/avatar/${file.filename}`;
    console.log( params.adminId);
    return this.userService.uploadAvatar(avatar, params.adminId);
  }

  @Get('avatar/:filename')
  async getAvatar(@Param('filename') filename, @Res() res): Promise<void>{
    res.sendFile(filename, {root: './uploads'});
  }

}
