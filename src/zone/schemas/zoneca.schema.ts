import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Zone } from "./zone.schema";
import { Annee } from "src/moisannee/schemas/annee.schema";


export type ZonecaDocument = HydratedDocument<Zoneca>;

@Schema()
export class Zoneca {

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
        description: 'The name of the zone',
    })
    cazone: number;

    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Annee.name,
    })
    @ApiProperty({
        example: 'Marcory Américain 1',
        description: 'The name of the zone',
    })
    annee: string;
}

export const ZonecaSchema = SchemaFactory.createForClass(Zoneca);
