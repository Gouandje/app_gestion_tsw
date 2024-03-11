import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RecherchecaDto {
    @IsString()
    param1: string;

    @IsString()
    param2: string;

}
