import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { Note } from "./schemas/note.schema";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../users/schemas/user.schema";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";

@Injectable()
export class NotesService{
    constructor( @InjectModel(Note.name) private readonly noteModel:Model<Note>){}

    async allUsersNotes(){
        return this.noteModel.find()
    }

    async makeMyNote(user:User, createNoteDto:CreateNoteDto):Promise<Note>{
        return this.noteModel.create({...createNoteDto, created_by: user.id}) 
    }

    async allMyNotes(user:User):Promise<Note[]>{
        const allUserNotes = await  this.noteModel.find({created_by: user.id})
        // return "you are now viewing notes!"
        if (!allUserNotes) {
            throw new NotFoundException("Could not get notes")
        }
        return allUserNotes
    }

    async getMyNote(noteId:string, user:User):Promise<Note | null>{
        const foundNote = await this.noteModel.findOne({_id: noteId, created_by:user.id})
        if (!foundNote) {
            throw new NotFoundException("Could not find the note.")
        }
        return foundNote
    }
    async changeMyNote(user:User, noteId:string, updatedNoteDto:UpdateNoteDto):Promise<Note|null>{
        const updatedNote = await this.noteModel.findOneAndUpdate(
        {
            _id:noteId,
            created_by: user.id
        },
        updatedNoteDto, 
        {
            new:true
        }
        )
        if (!updatedNote) {
            throw new NotFoundException("Note not found and could not be updated")
        }

        return updatedNote
    }
    async removeMyNote(noteId:string, user:User){
        const myNote  = await this.noteModel.findOneAndDelete({_id:noteId,created_by:user.id})
        if (!myNote) {
            throw new NotFoundException("Could not find note and delete")
        }
        return{
            message:"Note succesfully deleted"
        }
    }

    async removeAllNotes(){
        return await this.noteModel.deleteMany({}).exec()
    }

}