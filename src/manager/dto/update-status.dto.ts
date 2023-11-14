import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty } from "class-validator";

export class UpdateStatusDto{
    @ApiProperty({
        example: '8104f19c-a2d8-40f7-9a0b-12f4c6a4b80a',
         description: 'The name of the country',
    })
    @IsArray()
    @IsNotEmpty()
    status_mgr: string; 
}