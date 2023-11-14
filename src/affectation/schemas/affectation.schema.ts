import { ApiProperty } from "@nestjs/swagger";
import { Agence } from "src/angence/schemas/agence.schema";
import { Manager } from "src/manager/schemas/manager.schema";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type AffectationDocument = HydratedDocument<Affectation>;

@Schema()
export class Affectation {
  @ApiProperty({
      example: '8104f19c-a2d8-40f7-9a0b-12f4c6a4b80a',
      description: 'The ID of the angency',
    })
  @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Agence.name,
    })
  bureauId: string;

  @ApiProperty({
      example: 'a2d840f79a0b12f4c6a4b80a',
      description: 'The ID of the angency',
    })
  @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Manager.name,
    })
  managerId: string;
}

export const AffectationSchema = SchemaFactory.createForClass(Affectation);

