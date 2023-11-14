import { PartialType } from '@nestjs/swagger';
import { CreateSalaireManagerDto } from './create-salaire_manager.dto';

export class UpdateSalaireManagerDto extends PartialType(CreateSalaireManagerDto) {}
