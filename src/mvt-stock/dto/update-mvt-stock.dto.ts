import { PartialType } from '@nestjs/swagger';
import { CreateMvtStockDto } from './create-mvt-stock.dto';

export class UpdateMvtStockDto extends PartialType(CreateMvtStockDto) {}
