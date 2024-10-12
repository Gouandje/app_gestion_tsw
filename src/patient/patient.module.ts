import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from './schemas/patient.schema';
import { Patientkine, PatientkineSchema } from './schemas/patientkine.schema';
import { Patientdoctor, PatientdoctorSchema } from './schemas/patientdoctor.schema';
import { Caissekine, CaissekineSchema } from './schemas/caissekine.schema';
import { Caissekinesolde, CaissekinesoldeSchema } from './schemas/caissekinesolde.schema';
import { Caissemachine, CaissemachineSchema } from './schemas/caissemachine.schema';
import { Caissemachinesolde, CaissemachinesoldeSchema } from './schemas/caissemachinesolde.schema';
import { Caissecarnet, CaissecarnetSchema } from './schemas/caissecarnet.schema';
import { Caissecarnetsolde, CaissecarnetsoldeSchema } from './schemas/caissecarnetsolde.schema';
import { AgenceModule } from 'src/angence/agence.module';
import { Demande, DemandeSchema } from './schemas/demande.schema';
import { Seance, SeanceSchema } from './schemas/seancepatientkine.schema';
import { SalaireKine, SalaireKineSchema } from './schemas/salairekine.schema';
import { PaysService } from 'src/pays/pays.service';
import { PayscaService } from 'src/paysca/paysca.service';
import { PaysModule } from 'src/pays/pays.module';
import { MoisanneeModule } from 'src/moisannee/moisannee.module';
import { PayscaModule } from 'src/paysca/paysca.module';

@Module({
  imports:[
    HttpModule,
    AgenceModule,
    PaysModule,
    PayscaModule,
    MongooseModule.forFeature(
      [
        { 
          name: Patient.name, 
          schema: PatientSchema 
        },
        { 
          name: Patientkine.name, 
          schema: PatientkineSchema 
        },
        { 
          name: Patientdoctor.name, 
          schema: PatientdoctorSchema 
        },
        { 
          name: Caissekine.name, 
          schema: CaissekineSchema 
        },
        { 
          name: Caissekinesolde.name, 
          schema: CaissekinesoldeSchema 
        },
        { 
          name: Caissemachine.name, 
          schema: CaissemachineSchema 
        },
        { 
          name: Caissemachinesolde.name, 
          schema: CaissemachinesoldeSchema 
        },
        { 
          name: Caissecarnet.name, 
          schema: CaissecarnetSchema 
        },
        { 
          name: Caissecarnetsolde.name, 
          schema: CaissecarnetsoldeSchema
        },
        { 
          name: Demande.name, 
          schema: DemandeSchema
        },
        { 
          name: Seance.name, 
          schema: SeanceSchema
        },
        {
          name: SalaireKine.name,
          schema: SalaireKineSchema
        }

      ]
      )

  ],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService]
})
export class PatientModule {}
