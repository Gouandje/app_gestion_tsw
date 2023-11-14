import { PartialType } from '@nestjs/swagger';
import { CreateTauxDto } from './create-taux.dto';

export class UpdateTauxDto extends PartialType(CreateTauxDto) {}
