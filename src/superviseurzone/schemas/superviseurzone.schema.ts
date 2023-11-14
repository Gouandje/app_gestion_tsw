import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Manager } from "src/manager/schemas/manager.schema";
import { Zone } from "src/zone/schemas/zone.schema";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

export type SuperviseurzoneDocument = HydratedDocument<Superviseurzone>;

@Schema()
export class Superviseurzone {
    
    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Zone.name })
    @ApiProperty({
        example: '5efvbe54edfgbknjlh45',
        description: 'The zone id ',
    })
    zoneId: string;

    @Prop({type: MongooseSchema.Types.ObjectId, required: false, ref: Manager.name })
    @ApiProperty({
        example: '5efvbe54edfgjkhklh45',
        description: 'The manager id',
    })
    managerId: string;
}
export const SuperviseurzoneSchema = SchemaFactory.createForClass(Superviseurzone);

