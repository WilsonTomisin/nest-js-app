import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({
    timestamps:true
})
export class User extends Document{
    @Prop({
        isRequired: true,
        validate:{
            validator:(name:string)=> name.length > 2
        }
    })
    fullName:string

    @Prop({
        required:true,
        unique:true,
        lowercase:true,
        validate:{
            validator: (email:string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
        }
    })
    email:string

    @Prop({
        required:false,
        select:false,
        validate:{
            validator: (password:string) => password.length > 9
        }
    })
    password:string

    @Prop({enum:['Admin','Creator','Viewer'], default:"Creator"})
    role:string


}
export const UserSchema = SchemaFactory.createForClass(User)
UserSchema.index({email:1}, {unique:true}) // for better performance. it creates a reference for each email soo it is easier and faster to find.