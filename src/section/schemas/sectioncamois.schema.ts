import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Section } from "./section.schema";
import { Annee } from "src/moisannee/schemas/annee.schema";
import { Mois } from "src/moisannee/schemas/mois.schema";


export type SectioncamoisDocument = HydratedDocument<Sectioncamois>;

@Schema()
export class Sectioncamois {
    @ApiProperty({
        example: 'a2d840f79a0b12f4c6a4b80a',
        description: 'The ID of the angency',
      })
    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Section.name,
    })
    sectionId: string;

    @Prop({ required: true })
    @ApiProperty({
        example: 'Marcory Américain 1',
        description: 'The name of the zone',
    })
    casection: number;

    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Mois.name,
    })
    @ApiProperty({
        example: 'Marcory Américain 1',
        description: 'The name of the zone',
    })
    mois: string;

    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref: Annee.name,
    })
    @ApiProperty({
        example: 'Marcory Américain 1',
        description: 'The name of the zone',
    })
    annee: string;
}
export const SectioncamoisSchema = SchemaFactory.createForClass(Sectioncamois);
