import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateMoisDto {
    @ApiProperty({
        example: 'Kouassi',
        description: 'The name of the agency',
    })
    @IsString()
    @IsNotEmpty()
    valueMois: string;

    @ApiProperty({
        example: 'blue',
        description: 'The color',
    })
    @IsString()
    @IsNotEmpty()
    codeColor: string;
}
