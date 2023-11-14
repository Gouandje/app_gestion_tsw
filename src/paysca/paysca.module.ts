import { Module } from '@nestjs/common';
import { PayscaService } from './paysca.service';
import { PayscaController } from './paysca.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Paysca, PayscaSchema } from './schemas/paysca.schema';
import { Payscayear, PayscayearSchema } from './schemas/payscayear.schema';
import { MoisanneeModule } from 'src/moisannee/moisannee.module';

@Module({
  imports: [
    HttpModule,
    MoisanneeModule,
    MongooseModule.forFeature(
      [
        { 
          
          name: Paysca.name, 
          schema: PayscaSchema 
        },
        {
          name: Payscayear.name,
          schema: PayscayearSchema
        }
      ]
      )
  ],
  controllers: [PayscaController],
  providers: [PayscaService],
  exports: [PayscaService]
})
export class PayscaModule {}
