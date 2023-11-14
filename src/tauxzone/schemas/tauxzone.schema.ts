import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Zone } from "src/zone/schemas/zone.schema";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

export type TauxzoneDocument = HydratedDocument<Tauxzone>;

@Schema()
export class Tauxzone {
  
  @ApiProperty({
    example: '8104f19c-a2d8-40f7-9a0b-12f4c6a4b80a',
    description: 'The ID of the angency',
  })
  @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Zone.name
  })
  zoneId: string;

 @Prop({ required: true })
  @ApiProperty({
      example: '0.35%',
      description: 'taux de pourcentage',
  })
  taux_zone: number;
}
export const TauxzoneSchema = SchemaFactory.createForClass(Tauxzone);

