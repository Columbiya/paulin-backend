import { Chapter } from "src/models/chapter.entity";

export const chapterProviders = [
    {
        provide: 'CHAPTERS_REPOSITORY',
        useValue: Chapter
    }
]