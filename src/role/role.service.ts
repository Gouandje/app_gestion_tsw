import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role, RoleDocument } from './schemas/role.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RoleService {

  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const alreadyExists = await this.roleModel.exists({ role: createRoleDto.role }).lean();
    if(alreadyExists){
      throw new ConflictException(`cet role existe déjà dans la base de données`);
    }
    const createdRole = await this.roleModel.create(createRoleDto);

    if (!createdRole) {
      throw new InternalServerErrorException(
        'Impossible de créer le produit, veuillez réessayer',
      );
    }
    return createdRole;
  }

  async findAll() {
    const roles = await this.roleModel.find().exec();
    console.log(roles);
    return roles;
  }

  async findOne(id: string) {
    const role = await this.roleModel.findById(id);

    if (!role) {
      throw new NotFoundException('role non trouvé');
    }
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.roleModel
    .findOneAndUpdate({ id }, updateRoleDto, {
      new: true,
    })
    .lean();
  }

  async remove(id: string) {
   await this.roleModel.findByIdAndRemove(id).catch((err) => {
    throw new BadRequestException(err);
  });

  return `Role deleted`;
  }

  async rolebackup(){
    return await this.roleModel.find().exec();
  }
}
