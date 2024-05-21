import { IsNumber, IsObject, IsString, isObject } from "class-validator";

export class SalairekineDTO{
    @IsString()
    enmployerId: string;


    @IsNumber()
    salairekine: number;

    @IsString()
    mois: string;

    @IsNumber()
    annee: number;
}