import { PartialType } from '@nestjs/mapped-types';
import { CreatePaysDto } from './create-pays.dto';

export class UpdatePaysDto extends PartialType(CreatePaysDto) {}
