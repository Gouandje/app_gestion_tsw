import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Manager } from "src/manager/schemas/manager.schema";
import { Section } from "src/section/schemas/section.schema";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

export type ChefsectionDocument = HydratedDocument<Chefsection>;

@Schema()
export class Chefsection {
    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Section.name })
    @ApiProperty({
        example: '5efvbe54edfgbknjlh45',
        description: 'The zone id ',
    })
    sectionId: string;

    @Prop({type: MongooseSchema.Types.ObjectId, required: false, ref: Manager.name })
    @ApiProperty({
        example: '5efvbe54edfgjkhklh45',
        description: 'The manager id',
    })
    managerId: string;
}

export const ChefsectionSchema = SchemaFactory.createForClass(Chefsection);
