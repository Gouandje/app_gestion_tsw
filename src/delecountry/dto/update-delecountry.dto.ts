import { PartialType } from '@nestjs/swagger';
import { CreateDelecountryDto } from './create-delecountry.dto';

export class UpdateDelecountryDto extends PartialType(CreateDelecountryDto) {}
