import { HydratedDocument,Schema as MongooseSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Employer } from "src/employer/schemas/employer.schema";

export type SalaireKineDocument = HydratedDocument<SalaireKine>;

@Schema()
export class SalaireKine {
    @Prop({type: MongooseSchema.Types.ObjectId, required: false, ref: Employer.name })
    employerId: string;

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
export const SalaireKineSchema = SchemaFactory.createForClass(SalaireKine);