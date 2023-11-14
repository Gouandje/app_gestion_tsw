import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePaysDto {
    @ApiProperty({
        example: 'Côte d\'Ivoire',
        description: 'Le nom du pays',
    })
    @IsString()
    @IsNotEmpty()
     country_name: string;

     @ApiProperty({
        example: '+2250748027000',
        description: 'Le numéro de téléphone',
    })
    @IsString()
    @IsNotEmpty()
     telephone: string; 
}
