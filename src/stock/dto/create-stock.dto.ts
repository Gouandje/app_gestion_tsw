import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Schema as MongooseSchema } from 'mongoose';


export class CreateStockDto {
    @ApiProperty({
        example: '5efvbe54edfgbknjlh45',
        description: 'The country id ',
    })
    @IsString()
    @IsNotEmpty()
    paysId: string;

    @ApiProperty({
        example: '5efvbe54edfgjkhklh45',
        description: 'The product id',
    })
    @IsString()
    @IsNotEmpty()
    productId: string;

    @ApiProperty({
        example: '30000',
        description: 'The quantity product',
    })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({
        example: '01-05-2023',
        description: 'The date of the stock register',
    })
    @IsString()
    @IsNotEmpty()
    enterDate: string;

    @ApiProperty({
        example: '30-12-2023',
        description: 'The date of manufacture of the product',
    })
    @IsString()
    @IsNotEmpty()
    fabDate: string;

    @ApiProperty({
        example: '30-12-2026',
        description: 'The expiration date of the product',
    })
    @IsString()
    @IsNotEmpty()
    expirDate: string;

    @ApiProperty({
        example: '30-03-2026',
        description: 'The alert date of expiration date of the product',
    })
    @IsString()
    @IsNotEmpty()
    alertDate: string;


    @ApiProperty({
        example: '1000',
        description: 'The alert quantity of the stock',
    })
    @IsNumber()
    @IsNotEmpty()
    alertQty: number;

}
