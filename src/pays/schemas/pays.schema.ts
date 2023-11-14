import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import * as crypto from 'crypto';
import { randomUUID } from 'crypto';
import { ApiProperty } from "@nestjs/swagger";

export type PaysDocument = HydratedDocument<Pays>;

@Schema()
export class Pays {
    @ApiProperty({
        example: '8104f19c-a2d8-40f7-9a0b-12f4c6a4b80a',
        description: 'The ID of the admin',
      })
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    })
    adminId: string;
      
    @ApiProperty({
        example: '8104f19c-a2d8-40f7-9a0b-12f4c6a4b80a',
        description: 'The ID of the user',
      })
    @Prop({
    required: true,
    index: { unique: true },
    default: () => randomUUID(),
    })
    paysId: string;

    @Prop()
    @ApiProperty({
        example: 'Côte d\'Ivoire',
        description: 'Name of country',
    })
    country_name: string;

    @ApiProperty({
        example: 'gouandje@gmail.com',
        description: 'The email of the admin user',
    })
    
    @ApiProperty({
        example:'+2250768300358',
        description: 'The phone number of admin user',
    })
    @Prop()
    telephone: string;

}

export const PaysSchema = SchemaFactory.createForClass(Pays);


