import { Injectable } from '@nestjs/common';
import { CreatePlanningDto } from './dto/create-planning.dto';
import { UpdatePlanningDto } from './dto/update-planning.dto';
import { Planning, PlanningDocument } from './schemas/planning.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateEventStatusDtoo } from './dto/updateEventStatus.dto';
import { PatientService } from 'src/patient/patient.service';

@Injectable()
export class PlanningService {
  constructor(
    @InjectModel(Planning.name) private readonly planningModel: Model<PlanningDocument>,
    private readonly patientService: PatientService,
  ){

  }
  async create(createPlanningDto: CreatePlanningDto) {
    const created = await this.planningModel.create(createPlanningDto);
    return {
      id: created._id,
      start: created.start,
      end: created.end,
      title: created.title,
      color: created.color,
      actions: created.actions,
      resizable: created.resizable,
      draggable: created.draggable,
    };
  }

  async findAll() {
    const allevents = [];
    const events =  await this.planningModel.find().populate('patientkineId').populate('seanceId').exec();
    for(let i=0; i<events.length; i++){
      allevents.push(
        {
          id: events[i]._id,
          start: events[i].start ? new Date(events[i].start) : new Date(),
          end: events[i].end ? new Date(events[i].end) : new Date(),
          title: events[i].title,
          color: events[i].color,
          actions: events[i].actions,
          resizable: events[i].resizable,
          draggable: events[i].draggable,
        },
      );
    }
    return allevents;

  }

  async findOne(id: string) {
    return await this.planningModel.findById(id).populate('patientkineId').exec();

  }

  async findAllpatientkineseance(patientkineId:string) {
    return await this.planningModel.find({patientkineId:patientkineId}).populate('patientkineId').populate('seanceId').exec();
  }

  async findeventByseanceAndDelete(seanceId:string) {
    const event = await this.planningModel.findOneAndDelete({seanceId:seanceId}).exec();
    return event;

  }

  async update(id: string, updatePlanningDto: UpdatePlanningDto) {
    const updatedEvent = await this.planningModel.findByIdAndUpdate({_id: id},updatePlanningDto, {new: true}).lean();
    return updatedEvent;
  }

  async updatestatus(id: string, updateStatusDto: UpdateEventStatusDtoo) {
    const event = await this.planningModel.findById({_id: id}).exec();
    const updatedEventStatus = await this.planningModel.findByIdAndUpdate({_id: id},updateStatusDto, {new: true}).lean();

    if(updatedEventStatus){
      await this.patientService.comptabiliseSoldeseance(event.seanceId, event.start, event.end);
    }
    
    return updatedEventStatus;
  }

  async seancefait(){

  }

  async remove(id: string) {
    const deleted = await this.planningModel.findByIdAndRemove(id).exec();
    if(deleted){
      return {
        message: 'supprimé avec succès',
        status: 200
      };
    }else{
      return {
        message: 'Echec de suppression de event',
        status: 500
      };
    }
    
  }
}
