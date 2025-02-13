import { Module } from "@nestjs/common";
import { NotesController } from "./notes.controller";
import { NotesService } from "./notes.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Note ,  NoteSchema } from "./schemas/note.schema";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports:[
        MongooseModule.forFeature([{ name: Note.name,schema:NoteSchema}]),
        JwtModule
    ],
    controllers:[NotesController],
    providers:[NotesService],
    // exports:[NotesService]
})
export class NotesModule{}