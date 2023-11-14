import { HydratedDocument,Schema as MongooseSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Agence } from "src/angence/schemas/agence.schema";
import { ApiProperty } from "@nestjs/swagger";
import { Patient } from "./patient.schema";

export type CaissecarnetDocument = HydratedDocument<Caissecarnet>;

@Schema()
export class Caissecarnet {
    @Prop({type: MongooseSchema.Types.ObjectId, required: false, ref: Patient.name })
    @ApiProperty({
        example: '5efvbe54edfgjkhklh45',
        description: 'The product id',
    })
    patientId: string;
    
    @Prop({ required: true })
    @ApiProperty({
        example: '27-05-2023',
        description: 'The date of Caissecarnet',
    })
    date: string;

    @Prop({ required: true })
    @ApiProperty({
        example: 'sortie de caisse',
        description: 'The date of caisse',
    })
    montant: number;

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
export const CaissecarnetSchema = SchemaFactory.createForClass(Caissecarnet);
