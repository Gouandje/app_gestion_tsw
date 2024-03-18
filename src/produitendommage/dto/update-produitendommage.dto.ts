import { IsNumber, IsString } from "class-validator";

export class UpdateProduitendommageDto  {
    @IsString()
    productId: string;
    
    @IsNumber()
    quantity:number;
}
