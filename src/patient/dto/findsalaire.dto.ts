import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

export class FindSalaireDTO{
    @IsString()
    @IsNotEmpty()
    mois: string;

    @IsString()
    @IsNotEmpty()
    annee: string;

}