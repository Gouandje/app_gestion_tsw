import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

export class CaKineDTO{

    @IsNumber()
    chiffreAff: number;

    @IsNotEmpty()
    mois: string;

    @IsString()
    @IsNotEmpty()
    annee: string;

}