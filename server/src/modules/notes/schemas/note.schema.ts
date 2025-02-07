import { Document } from "mongoose";
import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";

import { IsNotEmpty, MinLength  } from "class-validator";


@Schema({
    timestamps: true
})
export class Note extends Document {
    @Prop({
        required: true,
    })
    title: string;

    @Prop({
        required:true,
        validate:{
            validator:(text:string)=> text.length > 10 
        }
    })
    text:string

    @Prop()
    created_by:string

}

export const NoteSchema = SchemaFactory.createForClass(Note) 
// NoteSchema.index({email:1}, {unique:true}) // for better performance. it creates a reference for each email soo it is easier and faster to find.