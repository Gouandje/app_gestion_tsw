import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { randomUUID } from "crypto";
import { HydratedDocument } from "mongoose";

export type ProductsDocument = HydratedDocument<Products>;

@Schema()
export class Products {
    
    @Prop({ required: true })
    @ApiProperty({
        example: 'OROKI',
        description: 'The name of the product',
    })
    name: string;

    @Prop({ required: true })
    @ApiProperty({
        example: '15000',
        description: 'The price of the product',
    })
    price: number;

    @Prop({ required: true })
    @ApiProperty({
        example: 'Oui/Non',
        description: 'The status of the product',
    })
    disponibilite: string;

    @Prop({required: false})
    @ApiProperty({
        example: '31-01-2023',
        description: 'The update date of the product',
    })
    updated: string;
}
export const ProductsSchema = SchemaFactory.createForClass(Products);
