import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { Schema as MongooseSchema } from 'mongoose';

export class CreateDocteurWeekendyDto {
    
    @ApiProperty({ example: '5efvbe54edfgbknjlh45', description: 'The country id '})
    @IsString()
    @IsNotEmpty()
    bureauId: string;

    @ApiProperty({ example: '5efvbe54edfgbknjlh45', description: 'The doctor id '})
    @IsString()
    @IsNotEmpty()
    doctorId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Weekendy month' })
    mois: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Weekendy month' })
    annee: string;

    @IsArray()
    @IsNotEmpty()
    // @Type(() => Products)
    @ApiProperty({ description: 'Products purchased' })
    items: [{quantity: number, productId: string}];
  
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({ description: 'chiffre d\'affaire totat' })
    caTotal: number;

    @IsString()
    createdAt: string;
}

