import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateAgenceDto  {
    @ApiProperty({
        example: '8104f19c-a2d8-40f7-9a0b-12f4c6a4b80a',
         description: 'The name of the country',
     })
     @IsString()
     @IsNotEmpty()
     countryId: string;
 
     @ApiProperty({
         example: '8104f19c-a2d8-40f7-9a0b-12f4c6a4b80a',
          description: 'The name of the country',
      })
      @IsString()
      zoneId: string;
 
      
      @ApiProperty({
         example: '8104f19c-a2d8-40f7-9a0b-12f4c6a4b80a',
          description: 'The name of the country',
      })
      @IsString()
      @Optional()
      sectionId: string;
  
 
     @ApiProperty({
         example: 'Agence de marcory',
         description: 'The name of the product',
     })
     @IsString()
     @IsNotEmpty()
     bureau_name: string;
}
