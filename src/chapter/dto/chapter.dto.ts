import { IsNotEmpty } from "class-validator";

export class ChapterDto {
    @IsNotEmpty()
    text: string
}