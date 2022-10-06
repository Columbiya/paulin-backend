import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Chapter } from "src/models/chapter.entity";
import { NewsService } from "src/news/news.service";
import { ChapterDto } from "./dto/chapter.dto";

@Injectable()
export class ChapterService {
    constructor(
        @Inject('CHAPTERS_REPOSITORY') private chapterRepository: typeof Chapter,
        private readonly newsService: NewsService
    ) {}

    async create(chapterDto: ChapterDto, id: number): Promise<Chapter> {
        const foundNews = await this.newsService.getOne(id)

        if (!foundNews) {
            throw new HttpException('no news found with the specified id', HttpStatus.BAD_REQUEST)
        }
        
        const chapter = await this.chapterRepository.create<Chapter>({...chapterDto, newId: id})
        return chapter
    }
}