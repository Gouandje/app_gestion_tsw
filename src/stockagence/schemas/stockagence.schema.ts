import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { randomUUID } from "crypto";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Agence } from "src/angence/schemas/agence.schema";
import { Products } from "src/produit/schemas/products.shema";

export type StockagenceDocument = HydratedDocument<Stockagence>;

@Schema()
export class Stockagence {
    
    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Agence.name })
    @ApiProperty({
        example: '5efvbe54edfgbknjlh45',
        description: 'The office id ',
    })
    agenceId: string;

    @Prop({type: MongooseSchema.Types.ObjectId, required: false, ref: Products.name })
    @ApiProperty({
        example: '5efvbe54edfgjkhklh45',
        description: 'The agency id',
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
    quantitytotalenmagasin: number;
}
export const StockagenceSchema = SchemaFactory.createForClass(Stockagence);

