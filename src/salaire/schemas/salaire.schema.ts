import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument, Schema as MongooseSchema  } from "mongoose";
import { Agence } from "src/angence/schemas/agence.schema";
import { Annee } from "src/moisannee/schemas/annee.schema";
import { Mois } from "src/moisannee/schemas/mois.schema";

export type SalaireDocument = HydratedDocument<Salaire>;

@Schema()
export class Salaire {
    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Agence.name })
    @ApiProperty({
        example: '5efvbe54edfgbknjlh45',
        description: 'The country id ',
    })
    bureauId: MongooseSchema.Types.ObjectId;

    @Prop({ required: true })
    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    salaire_agent: number;

    @Prop({ required: true })
    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    salaire_formateur: number;


    @Prop({ required: true })
    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    salaire_total_manager: number;

    @Prop({ required: true })
    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    motant_total: number;

    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Mois.name })
    @ApiProperty({
        example: 'mai 2023',
        description: 'The month salaire',
    })
    mois: string;

    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Annee.name })
    @ApiProperty({
        example: 'mai 2023',
        description: 'The month salaire',
    })
    annee: string;

    @Prop({ required: true })
    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    chiffreDaf: number;

    @Prop({ required: true })
    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    montant_bank: number;
    
    @Prop({ required: true })
    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    chargeBureau: number;

    @Prop({ required: true })
    @ApiProperty({
        example: '22-05-2023',
        description: 'The date of payment',
    })
    date_paiment: string;
    
}
export const SalaireSchema = SchemaFactory.createForClass(Salaire);