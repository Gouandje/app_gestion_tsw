import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Agence } from "src/angence/schemas/agence.schema";
import { Employer } from "src/employer/schemas/employer.schema";
import { Annee } from "src/moisannee/schemas/annee.schema";
import { Mois } from "src/moisannee/schemas/mois.schema";

export type WeekendyDocteurDocument = HydratedDocument<WeekendyDocteur>;

@Schema()
export class WeekendyDocteur {
    
    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Agence.name })
    @ApiProperty({
        example: '5efvbe54edfgbknjlh45',
        description: 'The office id ',
    })
    bureauId: string;
    
    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Employer.name })
    @ApiProperty({
        example: '5efvbe54edfgbknjlh45',
        description: 'The office id ',
    })
    doctorId: string;

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
       }
      ];
  
    @ApiProperty()
    @Prop({ required: true, type: Number })
    caTotal: number;

    @ApiProperty()
    @Prop({ required: true, type: String })
    createdAt: string;
}

export const WeekendyDocteurSchema = SchemaFactory.createForClass(WeekendyDocteur);
