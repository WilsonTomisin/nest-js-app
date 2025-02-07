import { IsNotEmpty } from "class-validator";

export class CreateNoteDto{
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    text:string

    @IsNotEmpty()
    created_by:string
}