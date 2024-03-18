import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { randomUUID } from "crypto";
import { HydratedDocument,Schema as MongooseSchema  } from "mongoose";
import { Products } from "src/produit/schemas/products.shema";


export type ProduitendommagestockDocument = HydratedDocument<Produitendommagestock>;

@Schema()
export class Produitendommagestock {
    
    @Prop({type: MongooseSchema.Types.ObjectId, required: false, ref: Products.name })
    @ApiProperty({
        example: 'OROKI',
        description: 'The name of the product',
    })
    productId: string;

    
    @Prop({ required: true })
    @ApiProperty({
        example: 'Oui/Non',
        description: 'The status of the product',
    })
    quantity: number;
}
export const ProduitendommagestockSchema = SchemaFactory.createForClass(Produitendommagestock);
