import { PartialType } from '@nestjs/swagger';
import { CreateTauxzoneDto } from './create-tauxzone.dto';

export class UpdateTauxzoneDto extends PartialType(CreateTauxzoneDto) {}
