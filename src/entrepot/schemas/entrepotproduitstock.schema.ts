import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { randomUUID } from "crypto";
import { HydratedDocument,Schema as MongooseSchema } from "mongoose";
import { Pays } from "src/pays/schemas/pays.schema";
import { Products } from "src/produit/schemas/products.shema";

export type EntrepotProduitStockDocument = HydratedDocument<EntrepotProduitStock>;

@Schema()
export class EntrepotProduitStock {

    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Products.name })
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

}
export const EntrepotProduitStockSchema = SchemaFactory.createForClass(EntrepotProduitStock);