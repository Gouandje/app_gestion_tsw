import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateExpenseDto {
    @ApiProperty({
        example: '27-05-2023',
        description: 'The date of the expense',
     })
    @IsString()
    categoryId: string;

    @ApiProperty({
        example: '27-05-2023',
        description: 'The date of the expense',
     })
    @IsString()
    @IsNotEmpty()
    date: string;

    @ApiProperty({
        example: '27-05-2023',
        description: 'The date of the expense',
     })
    @IsNumber()
    @IsNotEmpty()
    annee: number;

    @ApiProperty({
        example: '27-05-2023',
        description: 'The date of the expense',
     })
    @IsString()
    @IsNotEmpty()
    typetransaction: string;

    @ApiProperty({
        example: 'Boris',
        description: 'The auteur of the expense',
     })
    @IsString()
    @IsNotEmpty()
    auteur: string;

    @ApiProperty({
        example: 'Achat d\'équipement médical',
        description: 'The reason of the expense',
    })
    @IsString()
    @IsNotEmpty()
    motif: string;

    @ApiProperty({
        example: '100000',
        description: 'The amount of the expense',
    })
    @IsNumber()
    @IsNotEmpty()
    montant: number;

}
