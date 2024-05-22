import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Employer, EmployerDocument } from './schemas/employer.schema';
import { Model } from 'mongoose';

@Injectable()
export class EmployerService {

  constructor(
    @InjectModel(Employer.name) private readonly employerModel: Model<EmployerDocument>,
  ) {}

  async create(createEmployerDto: CreateEmployerDto) {
    const alreadyExists = await this.employerModel.exists({ telephone: createEmployerDto.telephone}).lean();
    if(alreadyExists){
      
      throw new ConflictException(`cet employer existe déjà dans la base de données`);
    }
    const createdEmployer = await this.employerModel.create(createEmployerDto);

    if (!createdEmployer) {
      throw new InternalServerErrorException(
        'Impossible de créer le employer, veuillez réessayer',
      );
    }
    return createdEmployer;
  }

  async findAll() {
    const employer = await this.employerModel.find().exec();
    return employer;
  }

  async findAllDoctor() {
    const doctors= [];
    const doctor = await this.employerModel.find().exec();
    for(let i=0; i<doctor.length; i++){
      if(doctor[i].grade == 'Chef de service médical' || doctor[i].grade == 'Adjoint du Chef de service médical'){
        doctors.push(doctor[i]);
      }
    }
    return doctors;
  }

  async findAllKine() {
    const kines= [];
    const kine = await this.employerModel.find().exec();
    for(let i=0; i<kine.length; i++){
      if(kine[i].grade == 'Kinésithérapeutre' || kine[i].grade == 'Assistant(e) Kinésithérapeutre'){
        kines.push(kine[i]);
      }
    }
    return kines;
  }

  async findOne(id: string) {
    const employer = await this.employerModel.findById(id);

    if (!employer) {
      throw new NotFoundException('employer non trouvée');
    }
    return employer;
  }

  async update(id: string, updateEmployerDto: UpdateEmployerDto) {
    const emp: Employer = await this.employerModel
    .findByIdAndUpdate(id, { $set: updateEmployerDto }, { new: true })
    .exec();
  if (!emp) {
    throw new NotFoundException(`The employee with id #${id} was not found.`);
  }
  return emp;
  }

  async remove(id: string) {
    await this.employerModel.findByIdAndRemove(id).catch((err) => {
      throw new BadRequestException(err);
    });
    return `employer deleted`;
  }

  async employerbackup() {
    const employer = await this.employerModel.find().exec();
    return employer;
  }
}
