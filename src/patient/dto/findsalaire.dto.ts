import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

export class FindSalaireDTO{
    @IsNotEmpty()
    mois: string;

    @IsNumber()
    @IsNotEmpty()
    annee: number;

}