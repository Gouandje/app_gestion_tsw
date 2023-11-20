import { PartialType } from '@nestjs/swagger';
import { CreateStockAlerteEntrepotDto } from './create-stock-alerte.dto';

export class UpdateStockAlerteEntrepotDto extends PartialType(CreateStockAlerteEntrepotDto) {}