import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { randomUUID } from "crypto";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Annee } from "src/moisannee/schemas/annee.schema";
import { Mois } from "src/moisannee/schemas/mois.schema";
import { Pays } from "src/pays/schemas/pays.schema";
import { Products } from "src/produit/schemas/products.shema";

export type VenteProduitendommageDocument = HydratedDocument<VenteProduitendommage>;

@Schema()
export class VenteProduitendommage {
    @Prop({type: MongooseSchema.Types.ObjectId, required: false, ref: Pays.name })
    @ApiProperty({
        example: 'OROKI',
        description: 'The name of the product',
    })
    countryId: string;
    
    @Prop({type: MongooseSchema.Types.ObjectId, required: false, ref: Products.name })
    @ApiProperty({
        example: 'OROKI',
        description: 'The name of the product',
    })
    productId: string;

    @Prop({type: MongooseSchema.Types.ObjectId, required: false, ref: Mois.name })
    @ApiProperty({
        example: 'Oui/Non',
        description: 'The status of the product',
    })
    mois: string;


    @Prop({type: MongooseSchema.Types.ObjectId, required: false, ref: Annee.name })
    @ApiProperty({
        
        description: 'The status of the product',
    })
    annee: string

    @Prop({ required: true })
    @ApiProperty({
        example: 'Oui/Non',
        description: 'The status of the product',
    })
    quantity: number;

    @Prop({ required: true })
    @ApiProperty({
        example: 'Oui/Non',
        description: 'The status of the product',
    })
    prix: number;
}
export const VenteProduitendommageSchema = SchemaFactory.createForClass(VenteProduitendommage);
