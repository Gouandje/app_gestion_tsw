import { PartialType } from '@nestjs/swagger';
import { CreateMouvementstockDto } from './create-mouvementstock.dto';

export class UpdateMouvementstockDto extends PartialType(CreateMouvementstockDto) {}
