import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateDetteDto{
    @ApiProperty({
        example: '5efvbe54edfgbknjlh45',
        description: 'The manager id ',
    })
    @IsString()
    @IsNotEmpty()
    managerId: string;

    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    @IsNumber()
    @IsNotEmpty()
    dette_manager: number;

    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    @IsNumber()
    @IsNotEmpty()
    salaire_net_manager: number;

    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    @IsString()
    @IsNotEmpty()
    mois: string;

    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    @IsString()
    @IsNotEmpty()
    annee: string;
}