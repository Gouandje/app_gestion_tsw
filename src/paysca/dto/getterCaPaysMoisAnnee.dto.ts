import { IsString } from "class-validator";

export class GetterCaPaysMoisAnneeDTO {
    @IsString()
    countryId: string;

    @IsString()
    mois: string;

    @IsString()
    annee: string;

}