import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Agence } from "src/angence/schemas/agence.schema";

export type CommisairecontrolDocument = HydratedDocument<Commisairecontrol>;

@Schema()
export class Commisairecontrol {
    @Prop({ required: true })
    @ApiProperty({
        example: 'Marcory Américain 1',
        description: 'The name of the agency',
    })
    codeAgent: string;

    @Prop({ required: true })
    @ApiProperty({
        example: 'Marcory Américain 1',
        description: 'The name of the agency',
    })
    nom: string;

    @Prop({ required: true })
    @ApiProperty({
        example: 'Marcory Américain 1',
        description: 'The name of the agency',
    })
    prenom: string;

    @Prop({ required: true })
    @ApiProperty({
        example: 'Marcory Américain 1',
        description: 'The name of the agency',
    })
    fullnamemanager: string;


    @Prop({ required: true })
    @ApiProperty({
        example: '+2250700000000',
        description: 'The phone of the manager',
    })
    telephone: string;

    @Prop({ required: false })
    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the manager',
    })
    date_naiss: string; 

    @Prop({ required: false })
    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the manager',
    })
    lieu_naiss: string; 

    @Prop({ required: false })
    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the manager',
    })
    piece: string; 

    @Prop({ required: false })
    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the manager',
    })
    num_piece: string; 

    @Prop({ required: true })
    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the manager',
    })
    genre: string; 

     @Prop({ required: true })
    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the manager',
    })
    grade: string;

    @Prop({ required: false })
    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the manager',
    })
    situation_matrimonial: string;

    @Prop({ required: false })
    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the manager',
    })
    ethnie: string;

    @Prop({ required: false })
    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the manager',
    })
    religion: string;

    @Prop({ required: false })
    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the manager',
    })
    maladie_exist: string;

    @Prop({ required: false })
    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the manager',
    })
    nbr_enfant: number;

    @Prop({ required: false })
    @ApiProperty({
        example: 'non affecté',
        description: 'The status of the manager',
    })
    casier_judiciaire: string;

    @ApiProperty({
        example: 'a2d840f79a0b12f4c6a4b80a',
        description: 'The ID of the angency',
      })
    @Prop({required: true})
    bureauId:[
        {
        _id: {
            type: MongooseSchema.Types.ObjectId,
            ref: Agence,
            }, 
        bureau_name: {
            type: string,
            ref: Agence,
          },
        }
    ];
}
export const CommisairecontrolSchema = SchemaFactory.createForClass(Commisairecontrol);