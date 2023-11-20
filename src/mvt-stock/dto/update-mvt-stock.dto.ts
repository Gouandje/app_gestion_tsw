import { PartialType } from '@nestjs/swagger';
import { CreateMvtStocPaysEntrepotkDto } from './create-mvt-stock.dto';

export class UpdateMvtStockDto extends PartialType(CreateMvtStocPaysEntrepotkDto) {}
