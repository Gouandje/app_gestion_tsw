import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RemboursementDto{
    
    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    @IsString()
    @IsNotEmpty()
    salaireId: string;

    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    @IsString()
    @IsNotEmpty()
    motifajout: string;

    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    @IsNumber()
    @IsNotEmpty()
    montantajout: number;
}