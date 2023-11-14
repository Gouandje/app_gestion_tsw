import { PartialType } from '@nestjs/swagger';
import { CreateAnneeDto } from './create-annee.dto';

export class UpdateAnneeDto extends PartialType(CreateAnneeDto) {}
