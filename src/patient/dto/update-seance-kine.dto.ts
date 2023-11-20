import { PartialType } from '@nestjs/swagger';
import { CreateSeancePatientKineDto } from './create-seance-kine.dto';

export class UpdateSeancePatientKineDto extends PartialType(CreateSeancePatientKineDto) {}