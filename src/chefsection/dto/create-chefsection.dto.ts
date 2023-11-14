import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateChefsectionDto {
    @ApiProperty({
        example: '5efvbe54edfgbknjlh45',
        description: 'The zone id ',
    })
    @IsString()
    @IsNotEmpty()
    sectionId: string;

    @ApiProperty({
        example: '5efvbe54edfgjkhklh45',
        description: 'The manager id',
    })
    @IsString()
    @IsNotEmpty()
    managerId: string;
}
