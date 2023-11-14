import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserUpdate {
    
    @ApiProperty({
        example: 'Gouandje Bi boris Sylvanus',
        description: 'The name of the admin',
    })
    @IsString()
    @IsNotEmpty()
    nom: string;
    
    @ApiProperty({
        example: 'gouandje@gmail.com',
        description: 'The email of the admin',
    })
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({
    example: '+2250768300358',
    description: 'The phone number of the admin',
    })
    @IsNotEmpty()
    @IsString()
    readonly telephone: string;

    @ApiProperty({ example: '5efvbe54edfgbknjlh45', description: 'The country id '})
    @IsArray()
    @IsNotEmpty()
    countryId: [{_id: string, country_name: string}];

    @ApiProperty({
    example: 'gestionnaire',
    description: 'The role of the admin',
    })
    @IsNotEmpty()
    @IsArray()
    roles: string[];

    @ApiProperty({
    example: '12345678',
    description: 'The password of the admin',
    })
    @IsString()
    mot_de_passe: string;
}