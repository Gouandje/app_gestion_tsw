import { IsNumber, IsString } from "class-validator";

export class CreateProduitendommageDto {

    @IsString()
    productId: string;

    @IsString()
    origine: string;

    @IsString()
    entrepot_or_agence: string;

    @IsString()
    motif: string;

    @IsNumber()
    quantity:number;
    
}
