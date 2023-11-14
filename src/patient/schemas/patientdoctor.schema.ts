import { HydratedDocument,Schema as MongooseSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Agence } from "src/angence/schemas/agence.schema";
import { ApiProperty } from "@nestjs/swagger";

export type PatientdoctorDocument = HydratedDocument<Patientdoctor>;

@Schema()
export class Patientdoctor {
    @Prop({type: MongooseSchema.Types.ObjectId, required: false, ref: Agence.name })
    @ApiProperty({
        example: '5efvbe54edfgjkhklh45',
        description: 'The product id',
    })
    bureauId: string;

    @Prop({ required: true })
    @ApiProperty({
        example: '27-05-2023',
        description: 'The date of Patientdoctor',
    })
    nom_prenom: string;

    @Prop({ required: true })
    @ApiProperty({
        example: 'sortie de caisse',
        description: 'The date of caisse',
    })
    telephone: string;

    @Prop({ required: true })
    @ApiProperty({
        example: 'sortie de caisse',
        description: 'The date of caisse',
    })
    genre: string;

    @Prop({ required: true })
    @ApiProperty({
        example: 'sortie de caisse',
        description: 'The date of caisse',
    })
    agent: string;

    @Prop({ required: true })
    @ApiProperty({
        example: 'sortie de caisse',
        description: 'The date of caisse',
    })
    telephoneagent: string;

    @Prop({ required: true })
    @ApiProperty({
        example: 'sortie de caisse',
        description: 'The date of caisse',
    })
    service: string;
 
}
export const PatientdoctorSchema = SchemaFactory.createForClass(Patientdoctor);
