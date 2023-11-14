import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument,Schema as MongooseSchema } from "mongoose";
import { Agence } from "src/angence/schemas/agence.schema";
import { Products } from "src/produit/schemas/products.shema";

export type MouvementstockDocument = HydratedDocument<Mouvementstock>;

@Schema()
export class Mouvementstock {
    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Agence.name })
    @ApiProperty({
        example: '5efvbe54edfgbknjlh45',
        description: 'The office id ',
    })
    bureauId: string;

    @ApiProperty()
    @Prop({ required: true, type: String })
    date_sortie: string;

    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Products.name })
    @ApiProperty({
        example: '5efvbe54edfgbknjlh45',
        description: 'The office id ',
    })
    productId: string;

    @ApiProperty({ example: '2000', description: 'The product quantity '})
    @Prop({ 
      required: true 
    })
    quantity: number;

}
export const MouvementstockSchema = SchemaFactory.createForClass(Mouvementstock);

