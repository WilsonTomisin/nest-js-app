import { IsNotEmpty } from "class-validator";

export class UpdateNoteDto{
    readonly title?: string


    readonly text?:string

    readonly created_by?:string
}