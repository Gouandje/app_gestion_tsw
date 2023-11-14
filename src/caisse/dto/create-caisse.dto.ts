import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateCaisseDto {
    @ApiProperty({
        example: '100000',
        description: 'The amount of the expense',
    })
    @IsNumber()
    solde: number;
}
