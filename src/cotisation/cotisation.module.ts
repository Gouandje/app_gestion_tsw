import { Module } from '@nestjs/common';
import { CotisationService } from './cotisation.service';
import { CotisationController } from './cotisation.controller';

@Module({
  controllers: [CotisationController],
  providers: [CotisationService]
})
export class CotisationModule {}
