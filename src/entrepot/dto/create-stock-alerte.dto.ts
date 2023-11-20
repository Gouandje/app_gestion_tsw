import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStockAlerteEntrepotDto {
    
    @ApiProperty({
        example: '5efvbe54edfgjkhklh45',
        description: 'The product id',
    })
    @IsString()
    @IsNotEmpty()
    productId: string;


    @ApiProperty({
        example: '1000',
        description: 'The alert quantity of the stock',
    })
    @IsNumber()
    @IsNotEmpty()
    alertQty: number;
}