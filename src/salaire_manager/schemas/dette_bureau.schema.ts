import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument, Schema as MongooseSchema  } from "mongoose";
import { Salaire } from "src/salaire/schemas/salaire.schema";

export type DetteBureauDocument = HydratedDocument<DetteBureau>;


@Schema()
export class DetteBureau {
    
    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Salaire.name })
    @ApiProperty({
        example: '5efvbe54edfgbknjlh45',
        description: 'The country id ',
    })
    salaireId: string;

    @Prop({ required: true })
    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    motifdette: string;

    @Prop({ required: true })
    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    montantdette: number;

}
export const DetteBureauSchema = SchemaFactory.createForClass(DetteBureau);