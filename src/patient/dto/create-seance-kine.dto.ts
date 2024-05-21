import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSeancePatientKineDto{
    @ApiProperty({
        example: 'azervntiio60bc',
        description: 'The id of the patient',
     })
    @IsString()
    @IsNotEmpty()
    patientkineId: string;

    @ApiProperty({
        example: 'séance 1',
        description: 'The status of the payment',
     })
    @IsString()
    @IsNotEmpty()
    seance_title: string;

    @ApiProperty({
        example: 'payé',
        description: 'The status of the payment',
     })
    @IsString()
    @IsNotEmpty()
    status_paid_seance: string;

    @ApiProperty({
        example: '27-05-2023',
        description: 'The date of the expense',
     })
    @IsString()
    @IsNotEmpty()
    date_created_seance: string;

    @ApiProperty({
        example: '12000',
        description: 'The price of the kine seance',
     })
    @IsNumber()
    @IsNotEmpty()
    cout_seance: number;
    
    
}