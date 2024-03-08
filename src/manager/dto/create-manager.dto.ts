import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateManagerDto {
 
    @ApiProperty({
        example: 'Kouassi',
        description: 'The name of the agency',
    })
    @IsString()
    @IsNotEmpty()
    nom: string;

    @ApiProperty({
        example: 'Kouamé  Fabrice',
        description: 'The name of the agency',
    })
    @IsString()
    @IsNotEmpty()
    prenom: string;

    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the manager',
    })
    @IsString()
    @IsNotEmpty()
    fullnamemanager: string;

    @ApiProperty({
        example: 'Bonoufla',
        description: 'The birthday of the manager',
    })
    @IsString()
    @Optional()
    lieu_naiss: string; 

    @ApiProperty({
        example: 'CI0001112223',
        description: 'The birthday of the manager',
    })
    @IsString()
    @Optional()
    piece: string;

    @ApiProperty({
        example: 'CI0001112223',
        description: 'The birthday of the manager',
    })
    @IsString()
    @Optional()
    num_piece: string;

    @ApiProperty({
        example: 'Feminin',
        description: 'The birthday of the manager',
    })
    @IsString()
    @IsNotEmpty()
    genre: string;

    @ApiProperty({
        example: 'CI0001112223',
        description: 'The birthday of the manager',
    })
    @IsString()
    @Optional()
    situation_matrimonial: string;

    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the manager',
    })
    @IsString()
    @Optional()
    ethnie: string;

    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the manager',
    })
    @IsString()
    @Optional()
    religion: string;

    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the manager',
    })
    @IsNumber()
    @Optional()
    nbr_enfant?: number;

    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the manager',
    })
    @IsString()
    @Optional()
    maladie_exist: string;


    @ApiProperty({
        example: 'Superviseur zone manager',
        description: 'The birthday of the manager',
    })
    @IsString()
    @IsNotEmpty()
    grade: string; 

    @ApiProperty({
        example: '+2250700000000',
        description: 'The phone of the manager',
    })
    @IsString()
    @IsNotEmpty()
    telephone: string;

    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the manager',
    })
    @IsString()
    @Optional()
    date_naiss: string;



}
