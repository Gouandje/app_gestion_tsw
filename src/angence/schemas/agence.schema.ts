import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Pays } from "src/pays/schemas/pays.schema";
import { Section } from "src/section/schemas/section.schema";
import { Zone } from "src/zone/schemas/zone.schema";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";


export type AgenceDocument = HydratedDocument<Agence>;

@Schema()
export class Agence {
  
  @ApiProperty({
    example: '8104f19c-a2d8-40f7-9a0b-12f4c6a4b80a',
    description: 'The ID of the angency',
  })
  @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Pays.name
  })
  countryId: string;

  @ApiProperty({
    example: 'a2d840f79a0b12f4c6a4b80a',
    description: 'The ID of the angency',
  })
  @Prop({type:String, required: false, ref: Section.name,
  })
  zoneId: string;

  @ApiProperty({
    example: 'a2d840f79a0b12f4c6a4b80a',
    description: 'The ID of the angency',
  })
  @Prop({type:String, required: false, ref: Section.name,
  })
  sectionId: string;

  @Prop({ required: true })
  @ApiProperty({
      example: 'Marcory Américain 1',
      description: 'The name of the agency',
  })
  bureau_name: string;
}
export const AgenceSchema = SchemaFactory.createForClass(Agence);
