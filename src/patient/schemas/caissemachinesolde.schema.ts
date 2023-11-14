import { HydratedDocument,Schema as MongooseSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Agence } from "src/angence/schemas/agence.schema";
import { ApiProperty } from "@nestjs/swagger";
import { Patient } from "./patient.schema";

export type CaissemachinesoldeDocument = HydratedDocument<Caissemachinesolde>;

@Schema()
export class Caissemachinesolde {
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
export const CaissemachinesoldeSchema = SchemaFactory.createForClass(Caissemachinesolde);
