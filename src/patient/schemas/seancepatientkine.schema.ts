import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument,Schema as MongooseSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Patientkine } from "./patientkine.schema";

export type SeanceDocument = HydratedDocument<Seance>;

@Schema()
export class Seance {
    @Prop({type: MongooseSchema.Types.ObjectId, required: false, ref: Patientkine.name })
    patientkineId: string;

    @Prop({ required: true })
    seance_title: string;

    @Prop({ required: true })
    status_paid_seance: string;

    @Prop({ required: false })
    date_created_seance: string;

    @Prop({ required: true })
    cout_seance: number;

 
}
export const SeanceSchema = SchemaFactory.createForClass(Seance);