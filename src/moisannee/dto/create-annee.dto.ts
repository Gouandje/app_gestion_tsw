import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateAnneeDto {
    @ApiProperty({
        example: '2023',
        description: 'The year',
    })
    @IsNumber()
    @IsNotEmpty()
    annee: number;

    @ApiProperty({
        example: '2023',
        description: 'The year',
    })
    @IsNumber()
    @IsNotEmpty()
    value: number;

}
