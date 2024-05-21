import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument,Schema as MongooseSchema } from "mongoose";
import { Agence } from "src/angence/schemas/agence.schema";
import { Products } from "src/produit/schemas/products.shema";

export type ConsignationDocument = HydratedDocument<Consignation>;

@Schema()
export class Consignation {
    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Agence.name })
    @ApiProperty({
        example: '5efvbe54edfgbknjlh45',
        description: 'The office id ',
    })
    bureauId: string;

    @ApiProperty()
    @Prop({ 
        required: true 
    })
    items:[
      {
        quantity: Number,
        productId: string,
      
      }];
    
    @ApiProperty()
    @Prop({ required: true, type: String })
    date_sortie: string;
}
export const ConsignationSchema = SchemaFactory.createForClass(Consignation);
