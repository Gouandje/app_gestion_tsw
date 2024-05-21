import { HydratedDocument,Schema as MongooseSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Employer } from "src/employer/schemas/employer.schema";

export type SalaireKineDocument = HydratedDocument<SalaireKine>;

@Schema()
export class SalaireKine {
    @Prop({type: MongooseSchema.Types.ObjectId, required: false, ref: Employer.name })
    enmployerId: string;

    @Prop({ required: true })
    salairekine: number;

    @Prop({ required: true })
    mois: string;

    @Prop({ required: true })
    annee: number;

 
}
export const SalaireKineSchema = SchemaFactory.createForClass(SalaireKine);