import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateZoneDto {
    
    @ApiProperty({ example: '5efvbe54edfgbknjlh45', description: 'The country id '})
    @IsString()
    @IsNotEmpty()
    countryId: string;

    @ApiProperty({
        example: 'Côte d\'Ivoire',
        description: 'Le nom du pays',
    })
    @IsString()
    @IsNotEmpty()
     zone_name: string;

}
