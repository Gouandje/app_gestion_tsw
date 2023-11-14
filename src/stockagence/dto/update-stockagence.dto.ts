import { PartialType } from '@nestjs/swagger';
import { CreateStockagenceDto } from './create-stockagence.dto';

export class UpdateStockagenceDto extends PartialType(CreateStockagenceDto) {}
