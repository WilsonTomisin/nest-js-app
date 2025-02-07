import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateNoteDto } from "./dto/create-note.dto";
import { User } from "../users/schemas/user.schema";
import { UpdateNoteDto } from "./dto/update-note.dto";


@UseGuards(JwtAuthGuard)
@Controller("notes")
export class NotesController{
    constructor(private readonly notesService:NotesService){}
    @Get()
    async findAll(@Req() req){
        return this.notesService.allNotes(req.user as User)
    }
    @Get(":id")
    async findNote(@Param("id") noteId:string, @Req() req){
        return this.notesService.getNote(noteId, req.user as User)
    }
    @Post()
    async createNote(@Req() req, @Body() createNoteDto:CreateNoteDto){
        // console.log(req.user)
        return this.notesService.makeNote(req.user as User , createNoteDto)   
    }
    @Patch(":id")
    async updateNote(@Req() req , @Param("id") noteId:string, @Body() updateNoteDto:UpdateNoteDto){
        return this.notesService.changeNote(req.user as User, noteId, updateNoteDto)
    }
    @Delete(":id")
    async deleteNote(@Param("id") noteId:string, @Req() req){
        return this.notesService.removeNote(noteId, req.user as User)
    }

}
