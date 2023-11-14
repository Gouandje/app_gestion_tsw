import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";

export type TauxDocument = HydratedDocument<Taux>;

@Schema()
export class Taux {
    
    @Prop({ required: true })
    @ApiProperty({
        example: '10',
        description: 'The 10%  of the CA',
    })
    taux_transport: number;

    @Prop({ required: true })
    @ApiProperty({
        example: '5',
        description: 'The 5% of the stock',
    })
    taux_bureau: number;

    @Prop({ required: true })
    @ApiProperty({
        example: '2',
        description: 'The 2% of the CA',
    })
    taux_formateur: number;

    @Prop({ required: true })
    @ApiProperty({
        example: '23',
        description: 'The 23% of the CA',
    })
    taux_salaire_agent: number;

    @Prop({ required: true })
    @ApiProperty({
        example: '5%',
        description: 'The 5%  of the CA',
    })
    taux_salaire_mgr: number;

    @Prop({ required: true })
    @ApiProperty({
        example: '10',
        description: '10% du salaire',
    })
    taux_garantie_mgr: number;

}
export const TauxSchema = SchemaFactory.createForClass(Taux);

