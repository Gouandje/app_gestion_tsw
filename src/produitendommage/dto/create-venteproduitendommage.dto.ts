import { IsNumber, IsString } from "class-validator";

export class CreateVenteProduitendommageDto {
    @IsString()
    countryId: string;

    @IsString()
    productId: string;

    @IsString()
    mois: string;

    @IsString()
    annee: string;

    @IsNumber()
    quantity: number;

    @IsNumber()
    prix:number;
    
}
