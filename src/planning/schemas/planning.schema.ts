import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument,Schema as MongooseSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Patientkine } from "src/patient/schemas/patientkine.schema";
import { Seance } from "src/patient/schemas/seancepatientkine.schema";


export type PlanningDocument = HydratedDocument<Planning>;

@Schema()
export class Planning {
    @Prop({type: MongooseSchema.Types.ObjectId, required: false, ref: Patientkine.name })
    patientkineId: string;

    @Prop({type: MongooseSchema.Types.ObjectId, required: false, ref: Seance.name })
    seanceId: string;


    @Prop({ required: true })
    title: string;

    @Prop({ type: Object, required: true })
    color: any;

    @Prop({ required: false })
    actions: [];

    @Prop({ required: true })
    allDay: boolean;

    @Prop({ required: true })
    draggable: boolean;

    @Prop({ type: Object, required: true })
    resizable: any;

    @Prop({ required: true })
    start: string;

    @Prop({ required: true })
    end: string;

    @Prop({ required: true })
    status: string;

 
}
export const PlanningSchema = SchemaFactory.createForClass(Planning);