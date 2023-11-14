import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateTauxDto {
    
    @ApiProperty({
        example: '10',
        description: 'The 10% of CA',
    })
    @IsNumber()
    @IsNotEmpty()
    taux_transport: number;

    @ApiProperty({
        example: '5',
        description: '5% of CA',
    })
    @IsNumber()
    @IsNotEmpty()
    taux_bureau: number;

    @ApiProperty({
        example: '2',
        description: 'The 2% of the CA',
    })
    @IsNumber()
    @IsNotEmpty()
    taux_formateur: number;

    @ApiProperty({
        example: '23',
        description: 'The 23% of CA',
    })
    @IsNumber()
    @IsNotEmpty()
    taux_salaire_agent: number;

    @ApiProperty({
        example: '5',
        description: 'The 5% CA',
    })
    @IsNumber()
    @IsNotEmpty()
    taux_salaire_mgr: number;

    @ApiProperty({
        example: '10',
        description: 'The 10% of salaria',
    })
    @IsNumber()
    @IsNotEmpty()
    taux_garantie_mgr: number;
}
