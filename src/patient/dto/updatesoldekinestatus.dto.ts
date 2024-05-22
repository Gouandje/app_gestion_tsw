import { IsNumber, IsString } from "class-validator";

export class UpdateSoldeKineStatusDTO {
    @IsNumber()
    chiffreAff: number;

    @IsString()
    mois: string;

    @IsNumber()
    annee: number;

    @IsString()
    status: string;

}