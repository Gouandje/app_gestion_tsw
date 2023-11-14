import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";

export type MoisDocument = HydratedDocument<Mois>;

@Schema()
export class Mois {
    
    @Prop({ required: true })
    @ApiProperty({
        example: 'janvier',
        description: 'The month',
    })
    valueMois: string;

    @Prop({ required: true })
    @ApiProperty({
        example: 'janvier',
        description: 'The color code',
    })
    codeColor: string;

}
export const MoisSchema = SchemaFactory.createForClass(Mois);
