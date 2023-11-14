import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEmployerDto {
     
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
        example: 'Bonoufla',
        description: 'The birthday of the manager',
    })
    @IsString()
    lieu_naiss: string; 

    @ApiProperty({
        example: 'CI0001112223',
        description: 'The birthday of the manager',
    })
    @IsString()
    piece: string;

    @ApiProperty({
        example: 'CI0001112223',
        description: 'The birthday of the manager',
    })
    @IsString()
    num_piece: string;

    @ApiProperty({
        example: 'CI0001112223',
        description: 'The birthday of the manager',
    })
    @IsString()
    situation_matrimonial: string;

    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the manager',
    })
    ethnie: string;

    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the manager',
    })
    religion: string;

    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the manager',
    })
    maladie_exist: number;

    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the manager',
    })
    nbr_enfant: number;


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
    @IsNotEmpty()
    date_naiss: string;

    @ApiProperty({
        example: 'affecter',
        description: 'The status of the manager',
    })
    @IsString()
    status_mgr: string;
}
