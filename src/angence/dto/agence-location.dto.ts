import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAgenceLocationDto {

     @IsString()
     bureauId: string;

    @IsString()
    localisation_bureau: string;
}
