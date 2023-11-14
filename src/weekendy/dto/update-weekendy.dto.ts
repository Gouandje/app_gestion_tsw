import { PartialType } from '@nestjs/swagger';
import { CreateWeekendyDto } from './create-weekendy.dto';

export class UpdateWeekendyDto extends PartialType(CreateWeekendyDto) {}
