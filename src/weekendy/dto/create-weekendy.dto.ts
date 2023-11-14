import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { Schema as MongooseSchema } from 'mongoose';

export class CreateWeekendyDto {
    
    @ApiProperty({ example: '5efvbe54edfgbknjlh45', description: 'The country id '})
    @IsString()
    @IsNotEmpty()
    bureauId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Weekendy month' })
    mois: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'weekendy debut' })
    annee: string;

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({ description: 'Products purchased' })
    items: [{quantity: number, productId: string, name: string}];
  
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({ description: 'chiffre d\'affaire totat' })
    caTotal: number;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({ description: 'montant deposé à la banque' })
    TotaltoBank: number;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({ description: 'charge totale du bureau' })
    chargebureauTotal: number;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({ description: 'prime de transport' })
    primetrsportTotal: number;

    @IsString()
    createdAt: string;
}

