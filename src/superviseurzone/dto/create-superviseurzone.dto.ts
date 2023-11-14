import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSuperviseurzoneDto {
    
    @ApiProperty({
        example: '5efvbe54edfgbknjlh45',
        description: 'The zone id ',
    })
    @IsString()
    @IsNotEmpty()
    zoneId: string;

    @ApiProperty({
        example: '5efvbe54edfgjkhklh45',
        description: 'The manager id',
    })
    @IsString()
    @IsNotEmpty()
    managerId: string;
}
