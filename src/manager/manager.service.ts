import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Manager, ManagerDocument } from './schemas/manager.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class ManagerService {

  constructor(
    @InjectModel(Manager.name) private readonly managerModel: Model<ManagerDocument>,
  ) {}
  async create(createManagerDto: CreateManagerDto) {
    const alreadyExists = await this.managerModel.exists({ telephone: createManagerDto.telephone}).lean();
    if(alreadyExists){
      throw new ConflictException(`cet manager existe déjà dans la base de données`);
    }
    const createdManager = await this.managerModel.create(createManagerDto);

    if (!createdManager) {
      throw new InternalServerErrorException(
        'Impossible de créer le manager, veuillez réessayer',
      );
    }
    return createdManager;
  }

  async findAll() {
    const manager = await this.managerModel.find().exec();
    return manager;
  }

  async findAllManagersNonAffectes() {
    const status_mgr = "non affecté";
    const manager = await this.managerModel.find({status_mgr: status_mgr}).exec();
    return manager;
  }

  async findAllSupervisor() {
    const grade: string = "Manager Superviseur de Zone";
    const manager = await this.managerModel.find({grade: grade}).exec();
    return manager;
  }

  async findAllManager() {
    const grade: string = "Manager";
    const manager = await this.managerModel.find({grade: grade}).exec();
    return manager;
  }

  async findOne(managerId: string) {
    const manager = await this.managerModel.findById(managerId);

    if (!manager) {
      throw new NotFoundException('manager non trouvée');
    }
    return manager;
  }

  async update(managerId: string, updateManagerDto: UpdateManagerDto) {
    const mgr: Manager = await this.managerModel
    .findByIdAndUpdate(managerId, { $set: updateManagerDto }, { new: true })
    .exec();
  if (!mgr) {
    throw new NotFoundException(`The agency with id #${managerId} was not found.`);
  }
  return mgr;
  }

  async remove(id: string) {
    // console.log(paysId);
    await this.managerModel.findByIdAndRemove(id).catch((err) => {
      throw new BadRequestException(err);
    });
    return `manager deleted`;
  }

  async updateStatut(managerId: string, updateStatusDto: UpdateStatusDto) {
    return this.managerModel
      .findByIdAndUpdate( managerId , updateStatusDto)
      .lean();
  }
}
