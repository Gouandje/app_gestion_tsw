import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument,Schema as MongooseSchema } from "mongoose";
import { Products } from "src/produit/schemas/products.shema";

export type StockAlerteEntrepotDocument = HydratedDocument<StockAlerteEntrepot>;
@Schema()
export class StockAlerteEntrepot {
    @Prop({type: MongooseSchema.Types.ObjectId, required: false, ref: Products.name })
    @ApiProperty({
        example: '5efvbe54edfgjkhklh45',
        description: 'The product id',
    })
    productId: string;

    @Prop({ required: true })
    @ApiProperty({
        example: '1000',
        description: 'The alert quantity of the stock',
    })
    alertQty: number;

}
export const StockAlerteEntrepotSchema = SchemaFactory.createForClass(StockAlerteEntrepot);

