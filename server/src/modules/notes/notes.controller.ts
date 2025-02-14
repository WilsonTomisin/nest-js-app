import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateNoteDto } from "./dto/create-note.dto";
import { User } from "../users/schemas/user.schema";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/guards/role.decorator";



@Controller("notes")
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)

export class NotesController{
    constructor(private readonly notesService:NotesService){}

    //ADMIN ROUTES
    @Roles("Admin")
    @Get('admin')
    async findAllNotes(){
        // return ' now viewing all notes'
        return this.notesService.allUsersNotes()
    }


    @Get()
    async findMyNotes(@Req() req){
        return this.notesService.allMyNotes(req.user as User)
    }
    @Get(":id")
    async findMyNote(@Param("id") noteId:string, @Req() req){
        return this.notesService.getMyNote(noteId, req.user as User)
    }
    @Post()
    async createMyNote(@Req() req, @Body() createNoteDto:CreateNoteDto){
        return this.notesService.makeMyNote(req.user as User , createNoteDto)   
    }
    @Patch(":id")
    async updateMyNote(@Req() req , @Param("id") noteId:string, @Body() updateNoteDto:UpdateNoteDto){
        return this.notesService.changeMyNote(req.user as User, noteId, updateNoteDto)
    }
    @Delete(":id")
    async deleteMyNote(@Param("id") noteId:string, @Req() req){
        return this.notesService.removeMyNote(noteId, req.user as User)
    }

    @Roles("Admin")
    @Delete()
    async deleteAllNotes(){
        return this.notesService.removeAllNotes()
    }

}
