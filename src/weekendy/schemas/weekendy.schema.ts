import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Agence } from "src/angence/schemas/agence.schema";
import { Annee } from "src/moisannee/schemas/annee.schema";
import { Mois } from "src/moisannee/schemas/mois.schema";
import { Products } from "src/produit/schemas/products.shema";


export type WeekendyDocument = HydratedDocument<Weekendy>;

@Schema()
export class Weekendy {
    
  
    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Agence.name })
    @ApiProperty({
        example: '5efvbe54edfgbknjlh45',
        description: 'The office id ',
    })
    bureauId: string;

    @ApiProperty()
    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Mois.name })
    mois: string;

    @ApiProperty()
    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Annee.name })
    annee: string;


    @ApiProperty()
    @Prop({ 
        required: true 
    })
    items: [
        {
        quantity: number, 
        productId: string,
        name: string,
       }
      ];
  
    @ApiProperty()
    @Prop({ required: true, type: Number })
    caTotal: number;

    @ApiProperty()
    @Prop({ required: true, type: Number })
    TotaltoBank: number;

    @ApiProperty()
    @Prop({ required: true, type: Number })
    chargebureauTotal: number;

    @ApiProperty()
    @Prop({ required: true, type: Number })
    primetrsportTotal: number

    @ApiProperty()
    @Prop({ required: false, type: Number })
    autre1: number;

    @ApiProperty()
    @Prop({ required: false, type: Number })
    autre2: number;

    @ApiProperty()
    @Prop({ required: false, type: String })
    moti1: string;

    @ApiProperty()
    @Prop({ required: false, type: String })
    moti2: string;
  
    @ApiProperty()
    @Prop({ required: true, type: String })
    createdAt: string;
}

export const WeekendySchema = SchemaFactory.createForClass(Weekendy);

