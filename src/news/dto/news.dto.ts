import { IsNotEmpty } from 'class-validator'

export class NewsDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    text: string

    @IsNotEmpty()
    author: string
}