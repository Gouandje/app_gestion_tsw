import { PartialType } from '@nestjs/swagger';
import { CreateEntrepotDto } from './create-entrepot.dto';

export class UpdateEntrepotDto extends PartialType(CreateEntrepotDto) {}
