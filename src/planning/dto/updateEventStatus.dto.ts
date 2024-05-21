import { IsArray, IsBoolean, IsNotEmpty, IsObject, IsString } from "class-validator";

export class UpdateEventStatusDtoo{
    @IsNotEmpty()
    status: string;

    @IsObject()
    @IsNotEmpty()
    color: {};

    @IsBoolean()
    draggable: boolean;

    @IsArray()
    actions: [];
}