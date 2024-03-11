import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RecherchecaDto {
    param1: string;
    param2: string;

}
