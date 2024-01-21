import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DetteBureauDto{
    
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
    motifdette: string;

    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    @IsNumber()
    @IsNotEmpty()
    montantdette: number;
}