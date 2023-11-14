import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument,Schema as MongooseSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Patientkine } from "./patientkine.schema";

export type SeanceDocument = HydratedDocument<Seance>;

@Schema()
export class Seance {
    @Prop({type: MongooseSchema.Types.ObjectId, required: false, ref: Patientkine.name })
    @ApiProperty({
        example: '5efvbe54edfgjkhklh45',
        description: 'The product id',
    })
    patientId: string;

    @Prop({ required: true })
    @ApiProperty({
        example: '27-05-2023 12:00',
        description: 'The date of Patientkine',
    })
    date_seance: string;


    @Prop({ required: true })
    @ApiProperty({
        example: 'sortie de caisse',
        description: 'The date of caisse',
    })
    cout_seance: number;

 
}
export const SeanceSchema = SchemaFactory.createForClass(Seance);