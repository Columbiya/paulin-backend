import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { FileService } from "src/helpers/file.service";
import { Chapter } from "src/models/chapter.entity";
import { New } from "src/models/news.entity";
import { NewsDto } from "./dto/news.dto";

@Injectable()
export class NewsService {
    constructor(
        @Inject('NEWS_REPOSITORY')
        private newsRepository: typeof New,
        private fileService: FileService
    ) {}

    async getAll(): Promise<New[]> {
        return this.newsRepository.findAll<New>()
    }

    async getOne(id: number): Promise<New> {
        return this.newsRepository.findByPk(id, {include: [Chapter]})
    }

    async create(news: NewsDto, image: Express.Multer.File): Promise<New> {
        if (!image) {
            throw new HttpException('no image was provided', HttpStatus.BAD_REQUEST)
        }
        
        const fileName = await this.fileService.writeFile(image)
        const createdNew = await this.newsRepository.create({...news, image: fileName})

        return createdNew
    }

    async delete(id: number): Promise<New> {
        const foundNews = await this.newsRepository.findByPk(id)

        if (!foundNews) {
            throw new HttpException('no news found with the specified id', HttpStatus.BAD_REQUEST)
        }

        this.fileService.deleteFile(foundNews.image)
        foundNews.chapter.forEach(chapter => chapter.destroy())
        await foundNews.destroy()
        return foundNews
    }
}