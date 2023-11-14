import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { randomUUID } from "crypto";
import { HydratedDocument,Schema as MongooseSchema } from "mongoose";
import { Pays } from "src/pays/schemas/pays.schema";
import { Products } from "src/produit/schemas/products.shema";

export type EntrepotOperationDocument = HydratedDocument<EntrepotOperation>;

@Schema()
export class EntrepotOperation {
    @Prop({type: MongooseSchema.Types.ObjectId, required: false, ref: Pays.name })
    @ApiProperty({
        example: '5efvbe54edfgjkhklh45',
        description: 'The product id',
    })
    countryId: string;

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

    @Prop({ required: true })
    @ApiProperty({
        example: '01-05-2023',
        description: 'The date of the stock register',
    })
    operationDate: string;

    @Prop({ required: true })
    @ApiProperty({
        example: 'sortie de stock',
        description: 'The date of manufacture of the product',
    })
    typeoperation: string;

}
export const EntrepotOperationSchema = SchemaFactory.createForClass(EntrepotOperation);