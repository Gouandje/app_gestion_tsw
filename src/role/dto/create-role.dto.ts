import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({
        example: 'Côte d\'Ivoire',
        description: 'Le nom du pays',
    })
    @IsString()
    @IsNotEmpty()
     role: string;

     @ApiProperty({
    example: 'gestionnaire',
    description: 'The role of the admin',
    })
    @IsNotEmpty()
    @IsArray()
    permission: string[];
}
