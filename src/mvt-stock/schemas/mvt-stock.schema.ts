import { Prop, SchemaFactory,Schema } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument,Schema as MongooseSchema } from "mongoose";
import { Pays } from "src/pays/schemas/pays.schema";
import { Products } from "src/produit/schemas/products.shema";

export type MvtStockPaysEntrepotDocument = HydratedDocument<MvtStockPaysEntrepot>;

@Schema()
export class MvtStockPaysEntrepot { 
    @Prop({type: MongooseSchema.Types.ObjectId, required: false, ref: Pays.name })
    @ApiProperty({
        example: '5efvbe54edfgjkhklh45',
        description: 'The product id',
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

    @Prop({ required: true })
    @ApiProperty({
        example: '01-05-2023',
        description: 'The date of the stock register',
    })
    sortieDate: string;

    @Prop({ required: true })
    @ApiProperty({
        example: '30-12-2023',
        description: 'The date of manufacture of the product',
    })
    fabDate: string;

    @Prop({ required: true })
    @ApiProperty({
        example: '30-12-2026',
        description: 'The expiration date of the product',
    })
    expirDate: string;

    @Prop({ required: true })
    @ApiProperty({
        example: '30-03-2026',
        description: 'The alert date of expiration date of the product',
    })
    alertDate: string;

    @Prop({ required: true })
    @ApiProperty({
        example: 'entrepot',
        description: 'The alert quantity of the stock',
    })
    destination: string;

}
export const MvtStockPaysEntrepotSchema = SchemaFactory.createForClass(MvtStockPaysEntrepot);
