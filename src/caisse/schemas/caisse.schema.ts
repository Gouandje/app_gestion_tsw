import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";

export type CaisseDocument = HydratedDocument<Caisse>;

@Schema()
export class Caisse {
    @Prop({ required: true })
    @ApiProperty({
        example: '300000',
        description: 'The balance',
    })
    solde: number;
}
export const CaisseSchema = SchemaFactory.createForClass(Caisse);
