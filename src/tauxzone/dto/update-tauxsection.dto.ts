import { PartialType } from '@nestjs/swagger';
import { CreateTauxsectionDto } from './create-tauxsection.dto';

export class UpdateTauxsectionDto extends PartialType(CreateTauxsectionDto) {}
