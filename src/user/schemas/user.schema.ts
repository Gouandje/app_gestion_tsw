import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

import * as crypto from 'crypto';
import { randomUUID } from 'crypto';

import { ApiProperty } from "@nestjs/swagger";
import { Pays } from "src/pays/schemas/pays.schema";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    
    @ApiProperty({
        example: '8104f19c-a2d8-40f7-9a0b-12f4c6a4b80a',
        description: 'The ID of the user',
      })
    @Prop({
    required: true,
    index: { unique: true },
    default: () => randomUUID(),
    })
    adminId: string;

    @ApiProperty({
        example: 'a2d840f79a0b12f4c6a4b80a',
        description: 'The ID of the angency',
      })
    @Prop({required: true})
    countryId:[
        {
        _id: {
            type: MongooseSchema.Types.ObjectId,
            ref: Pays,
            }, 
            country_name: {
            type: string,
            ref: Pays,
          },
        }
    ];

    @Prop()
    @ApiProperty({
        example: 'Gouandje bi boris sylvanus',
        description: 'The name of the admin user',
    })
    nom: string;

    @ApiProperty({
        example: 'gouandje@gmail.com',
        description: 'The email of the admin user',
    })
    @Prop()
    email: string;

    @ApiProperty({
        example:'+2250768300358',
        description: 'The phone number of admin user',
    })
    @Prop()
    telephone: string;

    @ApiProperty({
        example: 'administrateur',
        description:'The role of the admin user'
    })
    @Prop()
    roles: string[];
  
    @ApiProperty({
        example: '123456789',
        description:'The password of the admin user',
    })
    @Prop()
    mot_de_passe: string;

    @Prop({required: false})
    @ApiProperty({
        example:'gouandje.png',
        description:'The profile image of the admin user',
        
    })
    avatar: string;

}

export const UserSchema = SchemaFactory.createForClass(User);

