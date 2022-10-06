import { IsNotEmpty } from 'class-validator'

export class PartnerDto {
    @IsNotEmpty()
    link: string

    @IsNotEmpty()
    name: string

    image?: Express.Multer.File
}