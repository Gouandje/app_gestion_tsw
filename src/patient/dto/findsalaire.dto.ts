import { IsArray, IsBoolean, IsNotEmpty, IsObject, IsString } from "class-validator";

export class FindSalaireDTO{
    @IsNotEmpty()
    mois: string;

    @IsString()
    @IsNotEmpty()
    annee: {};

}