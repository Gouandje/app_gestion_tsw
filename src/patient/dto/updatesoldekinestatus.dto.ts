import { IsNumber, IsString } from "class-validator";

export class UpdateSoldeKineStatusDTO {
    @IsNumber()
    chiffreAff: number;

    @IsString()
    mois: string;

    @IsString()
    annee: string;

    @IsString()
    status: string;

}