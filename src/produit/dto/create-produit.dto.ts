import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProduitDto {
    @ApiProperty({
        example: 'OROKI',
        description: 'The name of the product',
    })
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty({
        example: '15000',
        description: 'The price of the product',
    })
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({
        example: 'Oui/Non',
        description: 'The price of the product',
    })
    @IsNotEmpty()
    @IsString()
    disponibilite: string;
}
