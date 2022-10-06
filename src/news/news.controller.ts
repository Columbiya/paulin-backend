import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { New } from "src/models/news.entity";
import { NewsDto } from "./dto/news.dto";
import { NewsService } from "./news.service";

@Controller('/news')
export class NewsController {
    constructor(
        private readonly newsService: NewsService
    ) {}

    @Get()
    async getAll(): Promise<New[]> {
        const foundNews = await this.newsService.getAll()
        return foundNews
    }

    @Get(':id')
    async getOne(
        @Param('id', ParseIntPipe) id: number
    ): Promise<New> {
        const foundNews = await this.newsService.getOne(id)
        return foundNews
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async create(
        @Body() news: NewsDto,
        @UploadedFile() image: Express.Multer.File
    ) {
        const createdNews = await this.newsService.create(news, image)
        return createdNews
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(
        @Param('id') id: number
    ): Promise<New> {
        const deletedNews = await this.newsService.delete(id)
        return deletedNews
    }
}