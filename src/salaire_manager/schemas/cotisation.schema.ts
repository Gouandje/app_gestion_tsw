import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument, Schema as MongooseSchema  } from "mongoose";
import { Manager } from "src/manager/schemas/manager.schema";

export type CotisationDocument = HydratedDocument<Cotisation>;


@Schema()
export class Cotisation {
    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Manager.name })
    @ApiProperty({
        example: '5efvbe54edfgbknjlh45',
        description: 'The country id ',
    })
    managerId: string;

    @Prop({ required: true })
    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    cotisation_totale: number;

    @Prop({ required: true })
    @ApiProperty({
        example: 'payé',
        description: 'The status of cotisation',
    })
    statut: string;
}
export const CotisationSchema = SchemaFactory.createForClass(Cotisation);