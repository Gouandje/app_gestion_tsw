import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCongeDto {
    @ApiProperty({
        example: 'Kouassi',
        description: 'The name of the agency',
    })
    @IsString()
    @IsNotEmpty()
    employerId: string;

    @ApiProperty({
        example: 'Kouamé  Fabrice',
        description: 'The name of the agency',
    })
    @IsString()
    @IsNotEmpty()
    type_conge: string;

    @ApiProperty({
        example: '1 mois',
        description: 'The birthday of the manager',
    })
    @IsNotEmpty()
    @IsString()
    duree: string; 

    @ApiProperty({
        example: '20/09/2023',
        description: 'The birthday of the manager',
    })
    @IsString()
    @IsNotEmpty()
    debut: string;

    @ApiProperty({
        example: '20/10/2023',
        description: 'The birthday of the manager',
    })
    @IsString()
    @IsNotEmpty()
    fin: string;

    @ApiProperty({
        example: 'en congé',
        description: 'The holiday of the employee',
    })
    @IsString()
    status: string;
}
