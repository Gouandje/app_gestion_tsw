import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Mission, MissionDocument } from './schemas/assignment.schema';
import { Model, Schema as MongooseSchema } from 'mongoose';

@Injectable()
export class AssignmentService {

  constructor(
    @InjectModel(Mission.name) private readonly missionModel: Model<MissionDocument>
    ){}

  async create(ceratemissionDto: CreateAssignmentDto) {
    const mission = await  this.missionModel.create(ceratemissionDto);
    if(!mission){
      throw new InternalServerErrorException(
        'Impossible de créer la mission, veuillez réessayer',
      );
    }
    return mission;
  }

  async findAll() {
    const missions = await this.missionModel.find()
                                            .populate('managerId')
                                            .populate('bureauId')
                                            .exec();
    return missions;
  }

  async findOne(id: MongooseSchema.Types.ObjectId): Promise<Mission> {
      const mission = await this.missionModel.findById(id);
  
      if (!mission) {
        throw new NotFoundException('Mission non trouvé');
      }
      return mission;
  }

  update(id: MongooseSchema.Types.ObjectId, updatemisionDto: UpdateAssignmentDto) {
    const updatedMission = this.missionModel.findOneAndUpdate({_id: id }, updatemisionDto, {
      new: true,
    }).exec();
    


    return updatedMission;
  }

  async remove(id: string) {
    await this.missionModel.findByIdAndRemove(id).catch((err) => {
      throw new BadRequestException(`une erreur c'est produite lors de la suppression`);
    });

    return `Mission supprimé avec succès`;
  }

  async missionbackup() {
    const missions = await this.missionModel.find().exec();
    return missions;
  }


}
