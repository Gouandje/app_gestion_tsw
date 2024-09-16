import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";

export type EmployerDocument = HydratedDocument<Employer>;

@Schema()
export class Employer {     
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
        example: '+2250700000000',
        description: 'The phone of the employer',
    })
    telephone: string;

    @Prop({ required: true })
    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the employer',
    })
    date_naiss: string; 

    @Prop({ required: true })
    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the employer',
    })
    lieu_naiss: string; 

    @Prop({ required: true })
    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the employer',
    })
    piece: string; 

    @Prop({ required: true })
    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the employer',
    })
    genre: string; 

    @Prop({ required: true })
    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the employer',
    })
    num_piece: string; 

     @Prop({ required: true })
    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the employer',
    })
    grade: string;

    @Prop({ required: true })
    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the employer',
    })
    situation_matrimonial: string;

    @Prop({ required: true })
    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the manager',
    })
    religion: string;

    @Prop({ required: true })
    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the manager',
    })
    maladie_exist: string;

    @Prop({ required: true })
    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the employer',
    })
    nbr_enfant: number;

    @Prop({ required: true })
    @ApiProperty({
        example: 'CDI',
        description: 'type de contrat',
    })
    type_contrat: string;

    @Prop({ required: true })
    @ApiProperty({
        example: '20-11-1989',
        description: 'date de debut du contrat',
    })
    debut_contrat: string;

    @Prop({ required: true })
    @ApiProperty({
        example: '20-11-1989',
        description: 'date de fin du contrat',
    })
    fin_contrat: string;

    @Prop({ required: false, default: 'en service' })
    @ApiProperty({
        example: 'en service',
        description: 'The status of the employer',
    })
    status: string; 
}

export const EmployerSchema = SchemaFactory.createForClass(Employer);

