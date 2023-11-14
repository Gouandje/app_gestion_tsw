import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Agence } from "src/angence/schemas/agence.schema";
import { Pays } from "src/pays/schemas/pays.schema";
import { Products } from "src/produit/schemas/products.shema";

export type ProduitvendubureauDocument = HydratedDocument<Produitvendubureau>;

@Schema()
export class Produitvendubureau {
    
    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Agence.name })
    @ApiProperty({
        example: '5efvbe54edfgbknjlh45',
        description: 'The country id ',
    })
    bureauId: string;

    @Prop({type: MongooseSchema.Types.ObjectId, required: false, ref: Products.name })
    @ApiProperty({
        example: '5efvbe54edfgjkhklh45',
        description: 'The product id',
    })
    productId: string;

    @Prop({ required: true })
    @ApiProperty({
        example: '30000',
        description: 'The quantity product',
    })
    quantity: number;

    @Prop({ required: true })
    @ApiProperty({
        example: '30000',
        description: 'The quantity product',
    })
    chiffreaffaire: number;

    @Prop({ required: true })
    @ApiProperty({
        example: '30-12-2023',
        description: 'The date of manufacture of the product',
    })
    mois: string;

    @Prop({ required: true })
    @ApiProperty({
        example: '30-12-2023',
        description: 'The date of manufacture of the product',
    })
    annee: number;


}
export const ProduitvendubureauSchema = SchemaFactory.createForClass(Produitvendubureau);
