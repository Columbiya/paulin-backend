import { New } from "src/models/news.entity";

export const newsProviders = [
    {
        provide: 'NEWS_REPOSITORY',
        useValue: New
    }
]