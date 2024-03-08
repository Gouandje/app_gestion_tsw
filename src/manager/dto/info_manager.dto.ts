import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class InfoManagerDto{
    @ApiProperty({
        example: '8104f19c-a2d8-40f7-9a0b-12f4c6a4b80a',
         description: 'The name of the country',
    })
    @IsString()
    @IsNotEmpty()
    nom: string; 

    // @ApiProperty({
    //     example: '8104f19c-a2d8-40f7-9a0b-12f4c6a4b80a',
    //      description: 'The name of the country',
    // })
    // @IsString()
    // @IsNotEmpty()
    // prenom: string; 
}