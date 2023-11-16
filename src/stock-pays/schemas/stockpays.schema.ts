import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument,Schema as MongooseSchema } from "mongoose";
import { Pays } from "src/pays/schemas/pays.schema";
import { Products } from "src/produit/schemas/products.shema";

export type StockPaysDocument = HydratedDocument<StockPays>;

@Schema()
export class StockPays {
    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Pays.name })
    @ApiProperty({
        example: '5efvbe54edfgbknjlh45',
        description: 'The country id ',
    })
    paysId: string;

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

    

}
export const StockPaysSchema = SchemaFactory.createForClass(StockPays);

