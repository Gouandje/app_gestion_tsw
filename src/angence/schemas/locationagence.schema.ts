import { Prop, Schema, SchemaFactory  } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Agence } from "./agence.schema";


export type LocationAgenceDocument = HydratedDocument<LocationAgence>;

@Schema()
export class LocationAgence {
  
  @ApiProperty({
    example: '8104f19c-a2d8-40f7-9a0b-12f4c6a4b80a',
    description: 'The ID of the angency',
  })
  @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Agence.name
  })
  bureauId: string;

  @Prop({ required: true })
  @ApiProperty({
      example: 'Marcory Américain 1',
      description: 'The name of the agency',
  })
  localisation_bureau: string;
}
export const LocationAgenceSchema = SchemaFactory.createForClass(LocationAgence);
