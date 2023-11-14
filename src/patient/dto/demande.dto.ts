import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DemandeDto {
    @ApiProperty({
        example: '27-05-2023',
        description: 'The date of the expense',
     })
    @IsString()
    @IsNotEmpty()
    motif: string;

    @ApiProperty({
        example: '27-05-2023',
        description: 'The date of the expense',
     })
    @IsNumber()
    @IsNotEmpty()
    montant: number

    @ApiProperty({
        example: '27-05-2023',
        description: 'The date of the expense',
     })
    @IsString()
    @IsNotEmpty()
    auteur:string;

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
    @IsString()
    @IsNotEmpty()
    status: string;
}
