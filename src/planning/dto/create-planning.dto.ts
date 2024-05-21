import { IsArray, IsBoolean, IsNotEmpty, IsObject, IsString } from "class-validator";

export class CreatePlanningDto {
    @IsString()
    @IsNotEmpty()
    patientkineId: string;

    @IsString()
    @IsNotEmpty()
    seanceId: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsObject()
    @IsNotEmpty()
    color: {};

    @IsArray()
    @IsNotEmpty()
    actions: [];

    @IsBoolean()
    @IsNotEmpty()
    allDay: boolean;

    @IsBoolean()
    @IsNotEmpty()
    draggable: boolean;

    @IsObject()
    @IsNotEmpty()
    resizable: {};

    @IsString()
    @IsNotEmpty()
    start: string;

    @IsString()
    @IsNotEmpty()
    end: string;

    @IsString()
    @IsNotEmpty()
    status: string;
}
