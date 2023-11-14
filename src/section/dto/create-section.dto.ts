import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSectionDto {
    @ApiProperty({ example: '5efvbe54edfgbknjlh45', description: 'The country id '})
    @IsString()
    @IsNotEmpty()
    countryId: string;

    @ApiProperty({ example: '5efvbe54edfgbknjlh45', description: 'The zone id '})
    @IsString()
    @IsNotEmpty()
    zoneId: string;

    @ApiProperty({
        example: 'Côte d\'Ivoire',
        description: 'Le nom du pays',
    })
    @IsString()
    @IsNotEmpty()
     section_name: string;
}
