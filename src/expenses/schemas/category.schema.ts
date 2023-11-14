import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
    @Prop({ required: true })
    @ApiProperty({
        example: '27-05-2023',
        description: 'The date of Category',
    })
    category_name: string; 
 
}
export const CategorySchema = SchemaFactory.createForClass(Category);