import { ApiProperty } from "@nestjs/swagger"
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateMouvementstockDto {
    @ApiProperty({
        example: '5efvbe54edfgbknjlh45',
        description: 'The office id ',
    })
    @IsString()
    @IsNotEmpty()
    bureauId: string;

    @ApiProperty({ example: '20/22/2023', description: 'The country id '})
    @IsString()
    @IsNotEmpty()
    date_sortie: string;

    @IsArray()
    @IsNotEmpty()
    // @Type(() => Products)
    @ApiProperty({ description: 'Products purchased' })
    readonly items: [{quantity: number, productId: string}];

    
}
