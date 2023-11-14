import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument, Schema as MongooseSchema  } from "mongoose";
import { Manager } from "src/manager/schemas/manager.schema";
import { Annee } from "src/moisannee/schemas/annee.schema";
import { Mois } from "src/moisannee/schemas/mois.schema";
import { Salaire } from "src/salaire/schemas/salaire.schema";

export type SalaireManagerDocument = HydratedDocument<SalaireManager>;


@Schema()
export class SalaireManager {
    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Manager.name })
    @ApiProperty({
        example: '5efvbe54edfgbknjlh45',
        description: 'The country id ',
    })
    managerId: string;

    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Salaire.name })
    @ApiProperty({
        example: '5efvbe54edfgbknjlh45',
        description: 'The salary id ',
    })
    salaireId: string;

    @Prop({ required: true })
    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    salaire_manager: number;

    @Prop({ required: true })
    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    dette_manager: number;

    @Prop({ required: true })
    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    salaire_net_manager: number;

    @Prop({ required: true })
    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    garantie_manager: number;


    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Mois.name })
    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    mois: string;

    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Annee.name })
    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    annee: string;
}
export const SalaireManagerSchema = SchemaFactory.createForClass(SalaireManager);
