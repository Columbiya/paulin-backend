import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/db/database.module";
import { FileService } from "src/helpers/file.service";
import { NewsController } from "./news.controller";
import { newsProviders } from "./news.providers";
import { NewsService } from "./news.service";

@Module({
    imports: [DatabaseModule],
    controllers: [NewsController],
    providers: [
        ...newsProviders,
        NewsService,
        FileService
    ],
    exports: [NewsService]
})

export class NewsModule {}