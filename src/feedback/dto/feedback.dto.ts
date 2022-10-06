import { IsNotEmpty, IsInt, Max, Min } from 'class-validator'

export class FeedbackDto {
    @IsNotEmpty()
    text: string

    @IsNotEmpty()
    expert: string

    @IsNotEmpty()
    @IsInt()
    @Max(5)
    @Min(1)
    rating: number

    @IsNotEmpty()
    @IsInt()
    partnerId: number
}