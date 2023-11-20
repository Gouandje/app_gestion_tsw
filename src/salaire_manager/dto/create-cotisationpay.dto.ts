import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatecotisationpayDto{

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
    cotisation_totale: number;

    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    @IsNumber()
    @IsNotEmpty()
    gratification: number;

    @ApiProperty({
        example: '30000',
        description: 'The amount manager',
    })
    @IsString()
    @IsNotEmpty()
    datecreated: string;



}