import { HydratedDocument,Schema as MongooseSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Agence } from "src/angence/schemas/agence.schema";
import { ApiProperty } from "@nestjs/swagger";

export type CaissecarnetsoldeDocument = HydratedDocument<Caissecarnetsolde>;

@Schema()
export class Caissecarnetsolde {
    @Prop({ required: true })
    @ApiProperty({
        example: 'sortie de caisse',
        description: 'The date of caisse',
    })
    chiffreAff: number;

    @Prop({ required: true })
    @ApiProperty({
        example: 'sortie de caisse',
        description: 'The date of caisse',
    })
    mois: string;

    @Prop({ required: true })
    @ApiProperty({
        example: 'sortie de caisse',
        description: 'The date of caisse',
    })
    annee: number;

 
}
export const CaissecarnetsoldeSchema = SchemaFactory.createForClass(Caissecarnetsolde);
