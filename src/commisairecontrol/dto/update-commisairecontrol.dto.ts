import { PartialType } from '@nestjs/swagger';
import { CreateCommisairecontrolDto } from './create-commisairecontrol.dto';

export class UpdateCommisairecontrolDto extends PartialType(CreateCommisairecontrolDto) {}
