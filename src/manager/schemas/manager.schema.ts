import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { randomUUID } from "crypto";
import { HydratedDocument } from "mongoose";


export type ManagerDocument = HydratedDocument<Manager>;

@Schema()
export class Manager {
    
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

    @Prop({ required: false, default: 'non affecté' })
    @ApiProperty({
        example: 'non affecté',
        description: 'The status of the manager',
    })
    status_mgr: string; 
}
export const ManagerSchema = SchemaFactory.createForClass(Manager);
