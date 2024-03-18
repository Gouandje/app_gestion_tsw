import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { randomUUID } from "crypto";
import { HydratedDocument,Schema as MongooseSchema  } from "mongoose";
import { Products } from "src/produit/schemas/products.shema";

export type ProduitendommageDocument = HydratedDocument<Produitendommage>;

@Schema()
export class Produitendommage {
    
    @Prop({type: MongooseSchema.Types.ObjectId, required: false, ref: Products.name })
    @ApiProperty({
        example: 'OROKI',
        description: 'The name of the product',
    })
    productId: string;

    @Prop({ required: true })
    @ApiProperty({
        example: '15000',
        description: 'The price of the product',
    })
    origine: string;

    @Prop({ required: false })
    @ApiProperty({
        example: 'Oui/Non',
        description: 'The status of the product',
    })
    entrepot_or_agence: string;

    @Prop({ required: true })
    @ApiProperty({
        example: 'Oui/Non',
        description: 'The status of the product',
    })
    motif: string;

    @Prop({ required: true })
    @ApiProperty({
        example: 'Oui/Non',
        description: 'The status of the product',
    })
    quantity: number;
}
export const ProduitendommageSchema = SchemaFactory.createForClass(Produitendommage);
