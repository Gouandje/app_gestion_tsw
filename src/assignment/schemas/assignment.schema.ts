import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument ,Schema as MongooseSchema  } from "mongoose";
import { Agence } from "src/angence/schemas/agence.schema";
import { Manager } from "src/manager/schemas/manager.schema";

export type MissionDocument = HydratedDocument<Mission>;

@Schema()
export class Mission {
    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Manager.name })
    @ApiProperty({
        example: '27-05-2023',
        description: 'The date of Mission',
    })
    managerId: string;

    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Agence.name })
    @ApiProperty({
        example: 'Boris',
        description: 'The auteur of the Mission',
    })
    bureauId: string;

    @Prop({ required: true })
    @ApiProperty({
        example: 'Achat d\'équipement médical',
        description: 'The reason of the Mission',
    })
    date_depart: string;

    @Prop({ required: true })
    @ApiProperty({
        example: 'Achat d\'équipement médical',
        description: 'The reason of the Mission',
    })
    date_retour: string;

    @Prop({ required: true })
    @ApiProperty({
        example: 'Achat d\'équipement médical',
        description: 'The reason of the Mission',
    })
    type_mission: string;


    
 
}
export const MissionSchema = SchemaFactory.createForClass(Mission);