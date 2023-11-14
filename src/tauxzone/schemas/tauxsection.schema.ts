import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Zone } from "src/zone/schemas/zone.schema";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Section } from "src/section/schemas/section.schema";

export type TauxsectionDocument = HydratedDocument<Tauxsection>;

@Schema()
export class Tauxsection {
  
  @ApiProperty({
    example: '8104f19c-a2d8-40f7-9a0b-12f4c6a4b80a',
    description: 'The ID of the angency',
  })
  @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Zone.name
  })
  zoneId: string;

  @ApiProperty({
    example: '8104f19c-a2d8-40f7-9a0b-12f4c6a4b80a',
    description: 'The ID of the angency',
  })
  @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Section.name
  })
  sectionId: string;

 @Prop({ required: true })
  @ApiProperty({
      example: '0.35%',
      description: 'taux de pourcentage',
  })
  taux_section: number;
}
export const TauxsectionSchema = SchemaFactory.createForClass(Tauxsection);

