import { IsNumber, IsObject, IsString, isObject } from "class-validator";

export class SalairekineDTO{
    @IsString()
    employerId: string;

    @IsNumber()
    chiffreAff: number;

    @IsNumber()
    pourcentage: number;
    
    @IsNumber()
    salairebrut: number;

    @IsNumber()
    dette: number;

    @IsNumber()
    gratification: number;

    @IsNumber()
    salairenet: number;

    @IsString()
    mois: string;

    @IsString()
    annee: string;

    @IsString()
    date_created: string;
}