import { HydratedDocument,Schema as MongooseSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Agence } from "src/angence/schemas/agence.schema";
import { ApiProperty } from "@nestjs/swagger";
import { Mois } from "src/moisannee/schemas/mois.schema";
import { Annee } from "src/moisannee/schemas/annee.schema";

export type CaissekinesoldeDocument = HydratedDocument<Caissekinesolde>;

@Schema()
export class Caissekinesolde {
    @Prop({ required: true })
    @ApiProperty({
        example: 'sortie de caisse',
        description: 'The date of caisse',
    })
    chiffreAff: number;

    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Mois.name
    })
    @ApiProperty({
        example: 'sortie de caisse',
        description: 'The date of caisse',
    })
    mois: string;

    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Annee.name
    })
    @ApiProperty({
        example: 'sortie de caisse',
        description: 'The date of caisse',
    })
    annee: string;

    @Prop({ required: true, default: 'mois non payé' })
    @ApiProperty({
        example: 'sortie de caisse',
        description: 'The date of caisse',
    })
    status: string;

 
}
export const CaissekinesoldeSchema = SchemaFactory.createForClass(Caissekinesolde);
