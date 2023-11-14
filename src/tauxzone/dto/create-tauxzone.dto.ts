import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTauxzoneDto {
    
    @ApiProperty({
        example: '8104f19c-a2d8-40f7-9a0b-12f4c6a4b80a',
         description: 'The name of the country',
     })
     @IsString()
     @IsNotEmpty()
     zoneId: string;
     
    @ApiProperty({
        example: '10',
        description: 'The 10% of CA',
    })
    @IsNumber()
    @IsNotEmpty()
    taux_zone: number;
}
