import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class QueryDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    paysId: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    anneeId: string;

}