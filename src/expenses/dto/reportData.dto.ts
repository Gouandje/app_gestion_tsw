import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ReportData {
    // @ApiProperty({
    //     example: '27-05-2023',
    //     description: 'The date of the expense',
    //  })
    // @IsString()
    // categoryId: string;

    @ApiProperty({
        example: '27-05-2023',
        description: 'The date of the expense',
     })
    @IsString()
    @IsNotEmpty()
    dateStart: string;

    @ApiProperty({
        example: '27-05-2023',
        description: 'The date of the expense',
     })
    @IsString()
    @IsNotEmpty()
    dateEnd: string;

    // @ApiProperty({
    //     example: '27-05-2023',
    //     description: 'The date of the expense',
    //  })
    // @IsNumber()
    // @IsNotEmpty()
    // annee: number;

    // @ApiProperty({
    //     example: '27-05-2023',
    //     description: 'The date of the expense',
    //  })
    // @IsString()
    // @IsNotEmpty()
    // typetransaction: string;


}
