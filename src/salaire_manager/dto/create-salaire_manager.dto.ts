import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Schema as MongooseSchema } from 'mongoose';

export class CreateSalaireManagerDto {
    @ApiProperty({
        example: '5efvbe54edfgbknjlh45',
        description: 'The bureau id ',
    })
    @IsString()
    @IsNotEmpty()
    bureauId: string;

    @ApiProperty({
        example: '5efvbe54edfgbknjlh45',
        description: 'The manager id ',
    })
    @IsString()
    @IsNotEmpty()
    managerId: string;

    @ApiProperty({
        example: '5efvbe54edfgjkhklh45',
        description: 'The salary id',
    })
    @IsString()
    @IsNotEmpty()
    salaireId: string;

   
    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    @IsNumber()
    @IsNotEmpty()
    salaire_manager: number;

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
    @IsNumber()
    @IsNotEmpty()
    garantie_manager: number;

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
