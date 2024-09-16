import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEmployerDto {
     
    @ApiProperty({
        example: 'Kouassi',
        description: 'The nom de l\'employé',
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
        example: 'féminin',
        description: 'The birthday of the manager',
    })
    @IsString()
    genre: string;

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
        description: 'The birthday of the employee',
    })
    @IsString()
    religion: string;

    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the employee',
    })
    @IsString()
    maladie_exist: string;

    @ApiProperty({
        example: '20-11-1989',
        description: 'The birthday of the manager',
    })
    @IsNumber()
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
        example: 'CDI',
        description: 'Le type de contrat',
    })
    @IsString()
    @IsNotEmpty()
    type_contrat: string;

    @ApiProperty({
        example: '20-11-1989',
        description: 'le debut du contrat',
    })
    @IsString()
    @IsNotEmpty()
    debut_contrat: string;

    @ApiProperty({
        example: '20-11-1989',
        description: 'la fin du contrat',
    })
    @IsString()
    @IsNotEmpty()
    fin_contrat: string;
}
