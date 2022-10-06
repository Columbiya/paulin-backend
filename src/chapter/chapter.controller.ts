import { Body, Controller, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Chapter } from "src/models/chapter.entity";
import { ChapterService } from "./chapter.service";
import { ChapterDto } from "./dto/chapter.dto";

@Controller('/chapters')
export class ChapterController {
    constructor(
        private readonly chapterService: ChapterService
    ) {}


    @UseGuards(JwtAuthGuard)
    @Post(':id')
    async create(
        @Body() chapterDto: ChapterDto,
        @Param('id', ParseIntPipe) id: number
    ): Promise<Chapter> {
        const chapter = await this.chapterService.create(chapterDto, id)
        return chapter
    }
}