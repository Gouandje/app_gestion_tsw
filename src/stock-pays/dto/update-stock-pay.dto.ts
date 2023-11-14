import { PartialType } from '@nestjs/swagger';
import { CreateStockPaysDto } from './create-stock-pay.dto';

export class UpdateStockPaysDto extends PartialType(CreateStockPaysDto) {}
