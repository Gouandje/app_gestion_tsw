import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GetterStockAlertPaysDto {
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
}