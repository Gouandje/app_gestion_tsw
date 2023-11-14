import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Pays } from "src/pays/schemas/pays.schema";
import { Zone } from "src/zone/schemas/zone.schema";


export type SectionDocument = HydratedDocument<Section>;

@Schema()
export class Section {
    @ApiProperty({
        example: 'a2d840f79a0b12f4c6a4b80a',
        description: 'The ID of the angency',
      })
    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Pays.name,
    })
    countryId: string;

    @ApiProperty({
        example: 'a2d840f79a0b12f4c6a4b80a',
        description: 'The ID of the angency',
      })
    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Zone.name,
    })
    zoneId: string;

    @Prop({ required: true })
    @ApiProperty({
        example: 'Marcory Américain 1',
        description: 'The name of the section',
    })
    section_name: string;
}
export const SectionSchema = SchemaFactory.createForClass(Section);
