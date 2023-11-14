import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginAuthDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @ApiProperty({ required: true, minLength: 8 })
    @IsNotEmpty()
    @IsString()
    mot_de_passe: string;
}
