import { Module } from '@nestjs/common';
import { CongeService } from './conge.service';
import { CongeController } from './conge.controller';
import { HttpModule } from '@nestjs/axios';
import { EmployerModule } from 'src/employer/employer.module';
import { Conge, CongeSchema } from './schemas/conge.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    EmployerModule,
    HttpModule,
    MongooseModule.forFeature(
      [
        { 
          name: Conge.name, 
          schema: CongeSchema 
        }
      ]
    )
  ],
  controllers: [CongeController],
  providers: [CongeService],
  exports: [CongeService]
})
export class CongeModule {}
