import { Module } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { EmployerController } from './employer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { Employer, EmployerSchema } from './schemas/employer.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature(
      [
        { 
          name: Employer.name, 
          schema: EmployerSchema 
        }
      ]
    )
  ],
  controllers: [EmployerController],
  providers: [EmployerService],
  exports: [EmployerService]
})
export class EmployerModule {}
