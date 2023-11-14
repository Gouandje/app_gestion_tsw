import { PartialType } from '@nestjs/swagger';
import { CreatePayscaDto } from './create-paysca.dto';

export class UpdatePayscaDto extends PartialType(CreatePayscaDto) {}
