import { IsNumber, IsString } from "class-validator";

export class CreatePayscaDto {
    @IsString()
    countryId: string;

    @IsString()
    mois: string;

    @IsString()
    annee: string;

    @IsNumber()
    caTotal: number;

}
