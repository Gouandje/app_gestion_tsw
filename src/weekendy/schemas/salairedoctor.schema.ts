import { HydratedDocument,Schema as MongooseSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Employer } from "src/employer/schemas/employer.schema";

export type SalaireDoctorDocument = HydratedDocument<SalaireDoctor>;

@Schema()
export class SalaireDoctor {
    @Prop({type: MongooseSchema.Types.ObjectId, required: false, ref: Employer.name })
    employerId: string;

    @Prop({ required: true })
    chiffreAff: number;

    @Prop({ required: true })
    chiffAffkine: number;

    @Prop({ required: true })
    partcakine: number;

    @Prop({ required: true })
    venteAutrebureau: number;

    @Prop({ required: true })
    caTotal: number;

    @Prop({ required: true })
    pourcentage: number;

    @Prop({ required: true })
    salairebase: number;

    @Prop({ required: true })
    salairebrut: number;

    @Prop({ required: true })
    dette: number;

    @Prop({ required: true })
    gratification: number;

    @Prop({ required: true })
    salairenet: number;

    @Prop({ required: true })
    mois: string;

    @Prop({ required: true })
    annee: number;

    @Prop({required: true})
    date_created: string;
 
}
export const SalaireDoctorSchema = SchemaFactory.createForClass(SalaireDoctor);