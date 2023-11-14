import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
        example: 'facture cie',
        description: 'The date of the expense',
     })
    @IsString()
    @IsNotEmpty()
    category_name: string;

}
