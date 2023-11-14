import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";

export type AnneeDocument = HydratedDocument<Annee>;

@Schema()
export class Annee {

    @Prop({ required: true })
    @ApiProperty({
        example: '2023',
        description: 'The year',
    })
    annee: number;

    @Prop({ required: true })
    @ApiProperty({
        example: '2023',
        description: 'The year',
    })
    value: number;
}

export const AnneeSchema = SchemaFactory.createForClass(Annee);

