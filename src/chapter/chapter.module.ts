import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/db/database.module";
import { NewsModule } from "src/news/news.module";
import { ChapterController } from "./chapter.controller";
import { chapterProviders } from "./chapter.providers";
import { ChapterService } from "./chapter.service";

@Module({
    imports: [DatabaseModule, NewsModule],
    controllers: [ChapterController],
    providers: [
        ...chapterProviders,
        ChapterService
    ]
})
export class ChapterModule {}