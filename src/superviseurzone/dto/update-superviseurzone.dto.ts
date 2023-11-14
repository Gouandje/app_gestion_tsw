import { PartialType } from '@nestjs/swagger';
import { CreateSuperviseurzoneDto } from './create-superviseurzone.dto';

export class UpdateSuperviseurzoneDto extends PartialType(CreateSuperviseurzoneDto) {}
