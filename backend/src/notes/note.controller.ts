/*
File Name: note.controller.ts
Author: Alexandre Kévin De Freitas Martins
Creation Date: 2023
Description: This file is the controller of the note.
Copyright (c) 2023 Tux Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the 'Software'), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from "@nestjs/common";
import { Note } from "./note.entity";
import { NotesService } from "./note.service";

@Controller("notes")
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @Get()
    async getAllNotes(): Promise<Note[]> {
        return await this.notesService.getAllNotes();
    }

    @Get(":id")
    async findOne(@Param("id") id: number): Promise<Note> {
        return await this.notesService.findOne(id);
    }

    @Post()
    async createNote(@Body() note: Note): Promise<void> {
        await this.notesService.createNote(note);
    }

    @Delete(":id")
    async deleteOneNoteById(@Param("id") id: string): Promise<void> {
        await this.notesService.deleteOneNoteById(id);
    }

    @Delete()
    async deleteAllNotes(): Promise<void> {
        await this.notesService.deleteAllNotes();
    }

    @Put(":id")
    async editOneNoteById(
        @Param("id") id: number,
        @Body() note: Note,
    ): Promise<Note> {
        return await this.notesService.editOneNoteById(id, note);
    }
}
