import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateAffectationDto {
    @ApiProperty({
        example: '8104f19c-a2d8-40f7-9a0b-12f4c6a4b80a',
         description: 'The name of the country',
     })
     @IsString()
     @IsNotEmpty()
     bureauId: string;

     @ApiProperty({
        example: '8104f19c-a2d8-40f7-9a0b-12f4c6a4b80a',
         description: 'The name of the country',
     })
     @IsArray()
     @IsNotEmpty()
     managerId: [{_id: string, nom: string }];
}
