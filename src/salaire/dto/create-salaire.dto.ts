import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSalaireDto {
    @ApiProperty({
        example: 'Côte d\'Ivoire',
        description: 'Le nom du pays',
    })
    @IsString()
    @IsNotEmpty()
    bureauId: string;

    @ApiProperty({
        example: 'Côte d\'Ivoire',
        description: 'Le nom du pays',
    })
    @IsNumber()
    @IsNotEmpty()
    salaire_agent: number;

    @ApiProperty({
        example: 'Côte d\'Ivoire',
        description: 'Le nom du pays',
    })
    @IsNumber()
    @IsNotEmpty()
    salaire_formateur: number;

    @ApiProperty({
        example: 'Côte d\'Ivoire',
        description: 'Le nom du pays',
    })
    @IsNumber()
    @IsNotEmpty()
    salaire_total_manager: number;

    @ApiProperty({
        example: 'Côte d\'Ivoire',
        description: 'Le nom du pays',
    })
    @IsNumber()
    @IsNotEmpty()
    motant_total: number;

    @ApiProperty({
        example: 'Côte d\'Ivoire',
        description: 'Le nom du pays',
    })
    @IsString()
    @IsNotEmpty()
    mois: string;

    @ApiProperty({
        example: 'Côte d\'Ivoire',
        description: 'Le nom du pays',
    })
    @IsString()
    @IsNotEmpty()
    annee: string;

    @ApiProperty({
        example: 'Côte d\'Ivoire',
        description: 'Le nom du pays',
    })
    @IsNumber()
    @IsNotEmpty()
    chiffreDaf: number;

    @ApiProperty({
        example: 'Côte d\'Ivoire',
        description: 'Le nom du pays',
    })
    @IsNumber()
    @IsNotEmpty()
    montant_bank: number;

    @ApiProperty({
        example: 'Côte d\'Ivoire',
        description: 'Le nom du pays',
    })
    @IsNumber()
    @IsNotEmpty()
    chargeBureau: number;

    @ApiProperty({
        example: 'Côte d\'Ivoire',
        description: 'Le nom du pays',
    })
    @IsString()
    @IsNotEmpty()
    date_paiment: string;
}
