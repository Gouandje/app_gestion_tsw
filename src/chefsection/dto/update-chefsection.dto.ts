import { PartialType } from '@nestjs/swagger';
import { CreateChefsectionDto } from './create-chefsection.dto';

export class UpdateChefsectionDto extends PartialType(CreateChefsectionDto) {}
