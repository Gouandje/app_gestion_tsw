import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSeancePatientKineDto{
    @ApiProperty({
        example: 'azervntiio60bc',
        description: 'The date of the expense',
     })
    @IsString()
    @IsNotEmpty()
    patientkineId: string;

    @ApiProperty({
        example: '27-05-2023',
        description: 'The date of the expense',
     })
    @IsString()
    @IsNotEmpty()
    date_seance: string;

    @ApiProperty({
        example: '27-05-2023',
        description: 'The date of the expense',
     })
    @IsNumber()
    @IsNotEmpty()
    cout_seance: string;
}