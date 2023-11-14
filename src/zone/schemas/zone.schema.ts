import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Pays } from "src/pays/schemas/pays.schema";


export type ZoneDocument = HydratedDocument<Zone>;

@Schema()
export class Zone {
    
    @ApiProperty({
        example: 'a2d840f79a0b12f4c6a4b80a',
        description: 'The ID of the angency',
      })
    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Pays.name,
    })
    countryId: string;

    @Prop({ required: true })
    @ApiProperty({
        example: 'Marcory Américain 1',
        description: 'The name of the zone',
    })
    zone_name: string;
}
export const ZoneSchema = SchemaFactory.createForClass(Zone);
