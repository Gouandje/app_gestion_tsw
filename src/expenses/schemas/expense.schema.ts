import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument,Schema as MongooseSchema } from "mongoose";
import { Category } from "./category.schema";

export type ExpenseDocument = HydratedDocument<Expense>;

@Schema()
export class Expense {
    
    @Prop({type: MongooseSchema.Types.ObjectId, required: false, ref: Category.name })
    @ApiProperty({
        example: '5efvbe54edfgjkhklh45',
        description: 'The product id',
    })
    categoryId: string;

    @Prop({ required: true })
    @ApiProperty({
        example: '27-05-2023',
        description: 'The date of expense',
    })
    date: string;

    @Prop({ required: true })
    @ApiProperty({
        example: '27-05-2023',
        description: 'The date of expense',
    })
    annee: number;

    @Prop({ required: true })
    @ApiProperty({
        example: 'sortie de caisse',
        description: 'The date of caisse',
    })
    typetransaction: string;

    @Prop({ required: true })
    @ApiProperty({
        example: 'Boris',
        description: 'The auteur of the expense',
    })
    auteur: string;

    @Prop({ required: true })
    @ApiProperty({
        example: 'Achat d\'équipement médical',
        description: 'The reason of the expense',
    })
    motif: string;

    @Prop({ required: true })
    @ApiProperty({
        example: 'Achat d\'équipement médical',
        description: 'The reason of the expense',
    })
    montant: number;  
 
}
export const ExpenseSchema = SchemaFactory.createForClass(Expense);