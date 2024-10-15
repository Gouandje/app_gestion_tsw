import { HydratedDocument,Schema as MongooseSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Employer } from "src/employer/schemas/employer.schema";
import { Mois } from "src/moisannee/schemas/mois.schema";
import { Annee } from "src/moisannee/schemas/annee.schema";

export type SalaireKineDocument = HydratedDocument<SalaireKine>;

@Schema()
export class SalaireKine {
    @Prop({type: MongooseSchema.Types.ObjectId, required: false, ref: Employer.name })
    employerId: string;

    @Prop({ required: true })
    chiffreAff:number;

    @Prop({ required: true })
    pourcentage: number;

    @Prop({ required: true })
    salairebrut: number;

    @Prop({ required: true })
    dette: number;

    @Prop({ required: true })
    gratification: number;

    @Prop({ required: true })
    salairenet: number;

    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Mois.name
    })
    mois: string;

    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Annee.name
    })
    annee: string;

    @Prop({required: true})
    date_created: string;
 
}
export const SalaireKineSchema = SchemaFactory.createForClass(SalaireKine);